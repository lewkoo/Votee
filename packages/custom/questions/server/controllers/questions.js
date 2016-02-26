
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

var errorString = 'Error: the question can not be found';


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
         * @api {post} api/questions/ Create a new question
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
            question.type = 'MULTIPLE-CHOICE';
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


        /* TODO: add api DOCS
         * vote for a question
         */
        vote: function(req, res){
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
         * @api {put} api/questions/:questionID Update a question
         * @apiName Update
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns updated question object
         *
         * @apiHeaderExample {json} Request-Example:
         *  {
         *      "title": "Updated title 3"
         *  }
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
         * @api {delete} api/questions/:questionID  Delete a question
         * @apiName Destroy
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns deleted object
         *
         * @apiSuccessExample Example of DELETE api/questions/56cdbe3e7f6fce18121d0f91
         * {
         *     "_id": "56cdbe3e7f6fce18121d0f91",
         *     "creator": {
         *       "_id": "56a438f67c239e7040c61a07",
         *       "username": "test",
         *       "name": "Bryan"
         *     },
         *     "title": "From web",
         *     "options": {
         *       "0": "wev",
         *       "1": "bbb",
         *       "2": "bb",
         *       "3": "jjj"
         *     },
         *     "answer": "1",
         *     "__v": 1,
         *     "answers": [
         *       {
         *         "_id": "56cfc7d3023517942b86d77d",
         *         "student": {
         *           "_id": "56a438f67c239e7040c61a07",
         *           "email": "test@gmail.com",
         *           "username": "test",
         *           "name": "Bryan",
         *           "__v": 0,
         *           "provider": "local",
         *           "roles": [
         *            "authenticated",
         *             "admin",
         *             "professor"
         *           ]
         *         },
         *         "answer": "TEST",
         *         "__v": 0,
         *         "created": "2016-02-26T03:34:43.544Z"
         *       }
         *     ],
         *     "type": "MULTIPLE-CHOICE",
         *     "created": "2016-02-24T14:29:18.469Z"
         *   }
         *
         *   @apiError Question to Delete not found
         *
         *   @apiErrorExample Example of GET api/questions/56cdbe3e7f6fce18121d0f91 after DELETE api/questions/56cdbe3e7f6fce18121d0f91
         *  {
         *      null
         *  }
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
         * @api {get} api/questions/:questionID Get a specific question
         * @apiName Show
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns specific questions by parameter ID
         *
         * @apiSuccessExample Example of GET api/questions/56d062c9f86af3c022bf6f0e
         *{
         *     "_id": "56d062c9f86af3c022bf6f0e",
         *     "creator": {
         *       "_id": "56a438f67c239e7040c61a07",
         *       "username": "test",
         *       "name": "Bryan"
         *     },
         *     "title": "What is the ebst movie?",
         *     "options": {
         *       "0": "not sure",
         *       "1": "Start wars",
         *       "2": "Lord of rings",
         *       "3": "Deadpool"
         *     },
         *     "answer": "3",
         *     "__v": 2,
         *     "answers": [
         *       {
         *         "_id": "56d063ace672c5f427200fc9",
         *         "student": {
         *           "_id": "56a438f67c239e7040c61a07",
         *           "email": "test@gmail.com",
         *           "username": "test",
         *           "name": "Bryan",
         *           "__v": 0,
         *           "provider": "local",
         *           "roles": [
         *             "authenticated",
         *             "admin",
         *             "professor"
         *           ]
         *         },
         *         "answer": "3",
         *         "__v": 0,
         *         "created": "2016-02-26T14:39:40.531Z"
         *       },
         *       {
         *         "_id": "56d06560536996f82477ffbe",
         *         "student": {
         *           "_id": "56a438f67c239e7040c61a07",
         *           "email": "test@gmail.com",
         *           "username": "test",
         *           "name": "Bryan",
         *           "__v": 0,
         *           "provider": "local",
         *           "roles": [
         *             "authenticated",
         *             "admin",
         *             "professor"
         *           ]
         *         },
         *         "answer": "1",
         *         "__v": 0,
         *         "created": "2016-02-26T14:46:56.708Z"
         *       }
         *     ],
         *     "type": "MULTIPLE-CHOICE",
         *     "created": "2016-02-26T14:35:53.762Z"
         *   }
         *
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
         * @api {get} api/questions/ Get a list of questions
         * @apiName All
         * @apiGroup Question
         * @apiVersion 0.1.0
         *
         * @apiSuccess {Object} returns array of question objects
         *
         * @apiSuccessExample Example of GET api/questions
         *
         *[
         *{
         *( "_id": "56d062c9f86af3c022bf6f0e",
         *  "creator": {
         *    "_id": "56a438f67c239e7040c61a07",
         *    "username": "test",
         *    "name": "Bryan"
         *  },
         *  "title": "What is the ebst movie?",
         *  "options": {
         *   "0": "not sure",
         *    "1": "Start wars",
         *    "2": "Lord of rings",
         *    "3": "Deadpool"
         *  },
         *  "answer": "3",
         *  "__v": 2,
         *  "answers": [
         *    "56d063ace672c5f427200fc9",
         *    "56d06560536996f82477ffbe"
         *  ],
         *  "type": "MULTIPLE-CHOICE",
         *  "created": "2016-02-26T14:35:53.762Z"
         *},
         *{
         *  "_id": "56cdc4f2e7895cec2959e1f9",
         *  "creator": {
         *    "_id": "56a438f67c239e7040c61a07",
         *    "username": "test",
         *    "name": "Bryan"
         *  },
         *  "title": "dfd",
         *  "options": {
         *    "0": "cvc",
         *    "1": "c",
         *    "2": "cv",
         *    "3": "cvc"
         *  },
         *  "answer": "0",
         *  "__v": 17,
         *  "answers": [
         *    "56cfc6196dda272428c93417",
         *    "56cfc686df0c241c370b69ec",
         *    "56cfc689df0c241c370b69ed",
         *    "56cfc6a8df0c241c370b69ee",
         *    "56cfc74026dd1c0436e1c0bf",
         *    "56cfc74326dd1c0436e1c0c0",
         *    "56cfc83a2fafa42c31dbc931"
         *  ],
         *  "type": "MULTIPLE-CHOICE",
         *  "created": "2016-02-24T14:57:54.961Z"
         * }, ]
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
