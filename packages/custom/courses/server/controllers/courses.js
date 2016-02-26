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

var errorString = 'Error: the course can not be found';

module.exports = function(Courses) {


    function error(res) {
        return res.status(500).json({
            error: errorString
        });
    }

    function validateCourse(req, res) {
        if (req.course !== null) {
            res.json(req.course);
        } else {
            error(res);
        }
    }


    return{
        /**
         * Find course by id
         */
        course: function(req, res, next, id) {
            Course.load(id, function(err, course){
                if (err) return next(err);
                if (!course){
                    req.course = null;
                }
                else
                {
                    req.course = course;
                }
                next();
            });
        },

        /**
         * Create a question
         */
        create: function(req, res) {
            var course = new Course(req.body);

            course.save(function(err) {
                if (err) {
                    //console.log('Err: ' + err);
                    return res.status(500).json({
                        error: 'Cannot save the course'
                    });
                }

                if(req.user !== undefined)
                {
                    Courses.events.publish({
                        action: 'created',
                        user: {
                            name: req.user.name
                        },
                        url: config.hostname + '/courses/' + course._id,
                        name: course.title
                    });
                }

                res.json(course);
            });
        },

        /**
         * Delete an article
         */
        destroy: function(req, res) {
            var course = req.course;

            if(course !== null)
            {
                course.remove(function(err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot delete the course'
                        });
                    }

                    if(req.user !== undefined)
                    {
                        Courses.events.publish({
                            action: 'deleted',
                            user: {
                                name: req.user.name
                            },
                            name: course.title
                        });
                    }

                    res.json(course);
                });
            }else
            {
                error(res);
            }


        },

        /**
         * Update a course
         */
        update: function(req, res) {
            var course = req.course;

            course = _.extend(course, req.body);

            if(course !== null) // the course was found
            {
                course.save(function(err) {
                    if (err) {
                        return res.status(500).json({
                            error: 'Cannot update a course'
                        });
                    }

                    if(req.user !== undefined)
                    {
                        Courses.events.publish({
                            action: 'updated',
                            user: {
                                name: req.user.name
                            },
                            name: course.title,
                            url: config.hostname + '/courses/' + course._id
                        });
                    }

                    res.json(course);
                });

            }else
            {
                error(res);
            }


        },

        /**
         * Show a course
         */
        show: function(req, res) {

            if(req.user !== undefined)
            {
                Courses.events.publish({
                    action: 'viewed',
                    user: {
                        name: req.user.name
                    },
                    name: req.course.title,
                    url: config.hostname + '/courses/' + req.course._id
                });
            }

            validateCourse(req, res);
        },
        /**
         * List of Courses
         */

        all: function(req, res) {

            Course.find({})
                .sort('-created')
                .populate('professor')
                .populate('students')
                .exec(function(err, courses){
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
