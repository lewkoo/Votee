'use strict';

/* jshint -W098 */
angular.module('mean.courses').controller('CoursesController', ['$scope', '$stateParams', 'Global', 'Courses', '$location', '$http','MeanUser','Users',
    function($scope, $stateParams, Global, Courses, $location, $http, MeanUser, Users) {
        $scope.global = Global;
        $scope.package = {
            name: 'courses'
        };

        $scope.addStudentMessageSuccess = null;
        $scope.addStudentMessageFailure = null;

        $scope.canCreateCourses = function()
        {
            return (MeanUser.isProfessor || MeanUser.isAdmin);
        };

        $scope.canEditCourses = $scope.canCreateCourses;

        $scope.hasAuthorization = function(course) {
            if (!course || !course.user) return false;
            return MeanUser.isAdmin || course.user._id === MeanUser.user._id;
        };

        $scope.isAuthorized = (MeanUser.isStudent || MeanUser.isProfessor || MeanUser.isAdmin);

        $scope.canAddStudents = function() {
            return (MeanUser.isProfessor || MeanUser.isAdmin);
        };

        $scope.isHidden=true;
        $scope.showHide = function() {
            if($scope.isHidden)
                $scope.isHidden=false;
            else
                $scope.isHidden=true;
        };

        $scope.find = function() {
            Courses.query(function(courses) {
                $scope.courses = courses;
            });
        };

        $scope.noEnrollment = function(courses) {
            for(var key in courses) {
                var course = courses[key];

                if($scope.isEnrolled(course)) {
                        return false;
                }
            }
            return true;
        };

        $scope.isEnrolled = function(course) {
            for(var key in course.students){
                var student = course.students[key];

                if(angular.equals(student._id, MeanUser.userId)){

                    return true;
                }
            }
            return false;
        };

        $scope.create = function(isValid) {
            if(isValid) {

                var course = new Courses({
                    title: $scope.course.title,
                    courseNumber: $scope.course.courseNumber,
                    description: $scope.course.description,
                    professor: $scope.course.professor,
                    questions: $scope.course.questions,
                    students: $scope.course.students,
                    created: $scope.course.created,
                    __v: $scope.course.__v
                });

                course.$save(function(response){
                    $location.path('courses/' + response._id);
                });

                $scope.course.title = '';
                $scope.course.courseNumber = 0;
                $scope.course.description = '';
                $scope.course.professor = '';
                $scope.course.questions = [];
                $scope.course.students = [];
                $scope.course.created = '';
                $scope.course.__v = 0;


            } else {
                $scope.submitted = true;
            }
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var course = $scope.course;
                if (!course.updated) {
                    course.updated = [];
                }
                course.updated.push(new Date().getTime());

                course.$update(function() {
                    $location.path('courses/' + course._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(course) {
            if (course) {
                course.$remove(function(response) {
                    for (var i in $scope.courses) {
                        if ($scope.courses[i] === course) {
                            $scope.courses.splice(i, 1);
                        }
                    }
                    $location.path('courses');
                });
            } else {
                $scope.course.$remove(function(response) {
                    $location.path('courses');
                });
            }
        };

        $scope.findOne = function() {
            Courses.get({
                courseId: $stateParams.courseId
            }, function(course) {
                $scope.course = course;
            });
        };

        $scope.getQuestions = function()
        {
            var questions = courses.questions;
            return questions;
        };

        $scope.addStudents = function(isValid, emailToQuery)
        {
            if(isValid){

                var course = $scope.course;

                var data = {
                    email: emailToQuery
                };

                $http.post('/api/courses/' + course._id + '/addStudent', data)
                    .then(function successCallback(response){
                        $scope.addStudentMessageSuccess = response.data.result;
                        $scope.addStudentMessageFailure = null;
                    }, function errorCallback(response){
                        $scope.addStudentMessageSuccess = null;
                        $scope.addStudentMessageFailure = response.data.error;
                    });

                // refresh the course object
                $scope.course = $scope.findOne();

            } else {
                $scope.submitted = true;
            }


        };

    }
]);
