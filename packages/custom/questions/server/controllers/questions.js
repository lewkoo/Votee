
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
            Question.load(id, function(err, article) {
                if (err) return next(err);
                if (!article) return next(new Error('Failed to load article ' + id));
                req.article = article;
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
         * Update an article
         */
        update: function(req, res) {
            var article = req.article;

            article = _.extend(article, req.body);


            article.save(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot update the article'
                    });
                }

                Questions.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: article.title,
                    url: config.hostname + '/articles/' + article._id
                });

                res.json(article);
            });
        },
        /**
         * Delete an article
         */
        destroy: function(req, res) {
            var article = req.article;


            article.remove(function(err) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot delete the article'
                    });
                }

                Articles.events.publish({
                    action: 'deleted',
                    user: {
                        name: req.user.name
                    },
                    name: article.title
                });

                res.json(article);
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
                name: req.article.title,
                url: config.hostname + '/articles/' + req.article._id
            });

            res.json(req.article);
        },
        /**
         * List of Question
         */
        all: function(req, res) {
            var query = req.acl.query('Question');

            query.find({}).sort('-created').populate('user', 'name username').exec(function(err, questions) {
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the questions'
                    });
                }

                res.json(questions)
            });

        }
    };
}