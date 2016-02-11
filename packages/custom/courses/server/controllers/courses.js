/**
 * Created by lewkoo on 2016-02-09.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Course = mongoose.model('Course'),
    config = require('meanio').loadConfig(),
    _ = require('lodash');

module.exports = function(Courses) {

    return{

        course: function(req, res, next, id) {
            Course.load(id, function(err, course){
                if (err) return next(err);
                if (!course) return next(new Error('Failed to load course ' + id));
                req.course = course;
                next();
            });
        },
        /**
         * Show a course
         */
        show: function(req, res) {

            Courses.events.publish({
                action: 'viewed',
                user: {
                    name: req.user.name
                },
                name: req.course.title,
                url: config.hostname + '/courses/' + req.course._id
            });

            res.json(req.course);
        },
        /**
         * List of Courses
         */

        all: function(req, res) {

            Course.find({}).sort('-created').populate('creator','name username').exec(function(err, courses){
                if (err) {
                    return res.status(500).json({
                        error: 'Cannot list the courses'
                    });
                }

                res.json(courses)
            });

        }

    }; // END of return

};// END of module.exports