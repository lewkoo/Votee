/**
 * Created by lewkoo on 2016-02-09.
 */

'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Course = mongoose.model('Course'),
    User = mongoose.model('User'),
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
         * Create a course
         *
         * @api {post} api/courses/ Create a new course
         * @apiName CreateCourse
         * @apiGroup Courses
         * @apiVersion 0.1.0
         *
         * @apiDescription This is Courses API
         *
         * @apiParam {String} courseNumber Mandatory courseNumber
         * @apiParam {String} title Mandatory course title string
         *
         * @apiParamExample {x-www-form-urlencoded} Request-example
         * {
         *   courseNumber: 4380
         *   title: Software Engineering
         * }
         *
         * @apiSuccess returns newly created course object
         *
         * @apiSuccessExample Example of successful response
         * {
         *    "_id" : "56d0d98c8aac33e7505c9cb4",
         *    "professor" : "56cfc9e4554036bf1ddc6764",
         *    "title" : "Soft Eng",
         *    "courseNumber" : 4380,
         *    "description" : "Cool course",
         *    "questions" : [],
         *    "students" : [],
         *    "created" : "2016-02-26T23:02:36.118Z",
         *    "__v" : 0
         * }
         */
        create: function(req, res) {
            var course = new Course(req.body);

            if(req.user !== undefined)
            {
                course.professor = req.user;
            }

            course.save(function(err) {
                if (err) {
                    console.log('Err: ' + err);
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
         * Delete a Course
         *
         * @api {delete} api/courses/:courseID  Delete a course
         * @apiName Destroy
         * @apiGroup Courses
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns deleted object
         *
         * @apiSuccessExample Example of successful response
         * {
         *    "_id" : "56d0d98c8aac33e7505c9cb4",
         *    "professor" : "56cfc9e4554036bf1ddc6764",
         *    "title" : "Soft Eng",
         *    "courseNumber" : 4380,
         *    "description" : "Cool course",
         *    "questions" : [],
         *    "students" : [],
         *    "created" : "2016-02-26T23:02:36.118Z",
         *    "__v" : 0
         * }
         *
         *   @apiError Course to Delete not found
         *
         *   @apiErrorExample Example of GET api/courses/56cdbe3e7f6fce18121d0f91 after DELETE api/courses/56cdbe3e7f6fce18121d0f91
         *  {
         *      null
         *  }
         *
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
         * Updates a Course
         *
         * @api {put} api/courses/:courseID Update a course
         * @apiName Update
         * @apiGroup Courses
         * @apiVersion 0.1.0
         *
         * @apiParam {String} title
         * @apiParam {String} description
         *
         * @apiParamExample {x-www-form-urlencoded} Request-example
         * {
         *   "title" : "Updated new title",
         *   "description" : "Updated new description"
         * }
         *
         * @apiSuccess returns updated question object
         *
         * @apiSuccessExample Example of successful response
         * {
         *    "_id" : "56d0d98c8aac33e7505c9cb4",
         *    "professor" : "56cfc9e4554036bf1ddc6764",
         *    "title" : "Updated new title",
         *    "courseNumber" : 4380,
         *    "description" : "Updated new description",
         *    "questions" : [],
         *    "students" : [],
         *    "created" : "2016-02-26T23:02:36.118Z",
         *    "__v" : 0
         * }
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

        /*
         * Add a student to a course
         *
         * @api {get} api/courses/:courseId/addStudent Add a student to a course
         * @apiName Add Student
         * @apiGroup Courses
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns 200 code
         *
         *
         */
        addStudent: function(req, res){
            // get the course we want to operate on
            var course = req.course;

            // check to see if the email is supplied in the body
            if(!req.body.email) return res.status(500).json({
                error: 'No email supplied'
            });

            User.findOne({
                email: req.body.email
            }).exec(function (err, user){

                if(err || !user) return res.status(500).json({
                    error: 'No such student found'
                });

                // check if the student is already in the course
                var isInArray = course.students.some(function (student) {
                    return student.id === user.id;
                });

                if(!isInArray){
                    // add the student to the list of students in a course
                    course.students.push(user._id);

                    // save the course to the DB
                    course.save();
                }else{
                    return res.status(500).json({
                        error: 'Student is already in the course'
                    });
                }

                Courses.events.publish({
                    action: 'updated',
                    user: {
                        name: req.user.name
                    },
                    name: course.title,
                    url: config.hostname + '/courses/' + course._id
                });

                return res.json({
                    result: "Student added!"
                });

            });
        },

        /**
         * Show a Course
         *
         * @api {get} api/courses/:courseId Get a specific course
         * @apiName Show
         * @apiGroup Courses
         * @apiVersion 0.1.0
         *
         * @apiSuccess returns specific course by parameter ID
         *
         * @apiSuccessExample Example of GET api/courses/56d062c9f86af3c022bf6f0e
         * {
         *    "_id" : "56d0d98c8aac33e7505c9cb4",
         *    "professor" : "56cfc9e4554036bf1ddc6764",
         *    "title" : "Updated new title",
         *    "courseNumber" : 4380,
         *    "description" : "Updated new description",
         *    "questions" : [],
         *    "students" : [],
         *    "created" : "2016-02-26T23:02:36.118Z",
         *    "__v" : 0
         * }
         *
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
         *
         * @api {get} api/courses/ Get a list of courses
         * @apiName All
         * @apiGroup Courses
         * @apiVersion 0.1.0
         *
         * @apiSuccess {Object} returns array of course objects
         *
         * @apiSuccessExample Example of GET api/courses
         *
         *[
         * {
         *    "_id" : "56d0d98c8aac33e7505c9cb4",
         *    "professor" : "56cfc9e4554036bf1ddc6764",
         *    "title" : "Updated new title",
         *    "courseNumber" : 4380,
         *    "description" : "Updated new description",
         *    "questions" : [],
         *    "students" : [],
         *    "created" : "2016-02-26T23:02:36.118Z",
         *    "__v" : 0
         * },
         * * {
         *    "_id" : "56d0d68d8bcc33e7505c9cb4",
         *    "professor" : "56cfc9e4554036bf1ddc6764",
         *    "title" : "Updated new title 2",
         *    "courseNumber" : 4380,
         *    "description" : "Updated new description 2",
         *    "questions" : [],
         *    "students" : [],
         *    "created" : "2016-02-26T23:01:36.118Z",
         *    "__v" : 0
         * } ]
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
