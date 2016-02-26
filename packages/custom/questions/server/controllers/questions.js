
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    //MultipleChoice = mongoose.model('MultipleChoice'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

var errorString = "Error: the question can not be found";


module.exports = function(Questions) {

    function error(res) {
        return res.status(500).json({
            error: errorString
        });
    }

    return {
        /**
         * Find question by id
         */
        question: function(req, res, next, id) {
            Question.load(id, function(err, question) {
                if (err) return next(err);

                if (!question){
                    req.question = null;
                } else {
                    req.question = question;
                }
                next();
            });
        },

        /**
         * Create a question
         *
         * @api {post} api/question/ Create a new question
         * @apiName CreateQuestion
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         * @apiDescription This is Questions API
         */
        create: function(req, res) {
            var question = new Question(req.body);
            //var answer = new Answer();

            //fill up the model with data from request
            if(req.user != undefined){
                question.creator = req.user;
            } else {
                question.creator = req.body.creator;
            }
            //TODO: read this from the request
            question.title = req.body.title;
            question.type = "MULTIPLE-CHOICE";
            question.answer = req.body.answer;
            question.options = req.body.options;

            //console.log(req.body.type == 'MULTIPLE-CHOICE');

            //if(req.body.type == 'MULTIPLE-CHOICE'){
            //    question.correctAnswer = req.body.correctAnswer;
            //}else {
            //    //open ended question..could possiby have more options (quiz?)
            //}

            question.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the question'
                    });
                }

                if(req.user != undefined){
                    Questions.events.publish({
                        action: 'created',
                        user: {
                            name: req.user.name
                        },
                        url: config.hostname + '/questions/' + question._id,
                        name: question.title
                    });
                }

                res.json(question);
            });
        },


        /*
         * vote for a question
         */
        vote: function(req, res){
            //BIG TODO: lots and lots of stuff here...need to figure out DB structure for this as well
            console.log('VOTING!');

            //console.log(req.body);
            var question = req.question;

            question = _.extend(question, req.body);

            // create a new Answer object
            var answer = new Answer({
                student : req.user,
                answer: req.body.selectedAnswer
            });

            // save it. if any errors hapen, developer will be notified
            answer.save(function (err) {
                if(err){
                    console.log(res, err);
                }
            });

            // add a reference to the list of answers for this question
            question.answers.push(answer);

            // save the question itself
            question.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot vote for the question'
                    });
                }

                Questions.events.publish({
                    action: 'voted',
                    user: {
                        name: req.user.name
                    },
                    name: question.title,
                    url: config.hostname + '/questions/' + question._id
                });

                res.json(question);
            });

            //Question.find({})
            //    .populate('answers')
            //    .exec(function(error, questions){
            //        console.log(questions);
            //    });
        },

        /**
         * Updates a Questions
         *
         * @api {put} api/question/:questionID Update a question
         * @apiName Update
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         */
        update: function(req, res) {
            var question = req.question;

            question = _.extend(question, req.body);


            if(question != null){
                question.save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot update the question'
                        });
                    }

                    if(req.user != undefined){
                        Questions.events.publish({
                            action: 'updated',
                            user: {
                                name: req.user.name
                            },
                            name: question.title,
                            url: config.hostname + '/questions/' + question._id
                        });
                    }
                    res.json(question);
                });
            } else {
                error(res);
            }

        },
        /**
         * Delete a Question
         *
         * @api {delete} api/question/:questionID  Delete a question
         * @apiName Destroy
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         */
        destroy: function(req, res) {
            var question = req.question;

            if(question != null){
                question.remove(function(err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot delete the question'
                        });
                    }

                    if(req.user != undefined) {
                        Questions.events.publish({
                            action: 'deleted',
                            user: {
                                name: req.user.name
                            },
                            name: question.title
                        });
                    }

                    res.json(question);
                });
            } else {
                error(res);
            }

        },
        /**
         * Show a Questions
         *
         * @api {get} api/question/:questionID Get a specific question
         * @apiName Show
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns specific questions
         *
         */
        show: function(req, res) {

            if(req.user != undefined){
                Questions.events.publish({
                    action: 'viewed',
                    user: {
                        name: req.user.name
                    },
                    name: req.question.title,
                    url: config.hostname + '/questions/' + req.question._id
                });
            }

            res.json(req.question);
        },


        answer: function(req, res) {
            var question = req.question;

            res.json(question);
            return question.answer;
        },

        /**
         * List of Questions
         *
         * @api {get} api/question/ Get a list of questions
         * @apiName All
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns a list of all questions
         *
         */
        all: function(req, res) {

            Question.find({}).sort('-created').populate('creator','name username').exec(function(err, questions){
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the questions'
                    });
                }

                res.json(questions)
            });

        }
    };
};
