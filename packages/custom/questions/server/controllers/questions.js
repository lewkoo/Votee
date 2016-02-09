
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Question = mongoose.model('Question'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Questions) {

    return {
        /**
         * Find question by id
         */
        question: function(req, res, next, id) {
            Question.load(id, function(err, question) {
                if (err) return next(err);
                if (!question) return next(new Error('Failed to load question ' + id));
                req.question = question;
                next();
            });
        },

        /**
         * Create a question
         */
        create: function(req, res) {
            var question = new Question(req.body);
            question.creator = req.user;

            question.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot save the question'
                    });
                }

                Questions.events.publish({
                    action: 'created',
                    user: {
                        name: req.user.name
                    },
                    url: config.hostname + '/questions/' + question._id,
                    name: question.title
                });

                res.json(question);
            });
        },
        /**
         * Update question
         */
        update: function(req, res) {
            var question = req.question;

            question = _.extend(question, req.body);


            question.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the question'
                    });
                }

                Questions.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: question.title,
                    url: config.hostname + '/questions/' + question._id
                });

                res.json(question);
            });
        },
        /**
         * Delete a question
         */
        destroy: function(req, res) {
            var question = req.question;


            question.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the question'
                    });
                }

                Questions.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: question.title
                });

                res.json(question);
            });
        },
        /**
         * Show a question
         */
        show: function(req, res) {

            Questions.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.question.title,
                url: config.hostname + '/questions/' + req.question._id
            });

            res.json(req.question);
        },
        /**
         * List of Questions
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