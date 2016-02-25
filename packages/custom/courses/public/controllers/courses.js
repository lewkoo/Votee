'use strict';

/* jshint -W098 */
angular.module('mean.courses').controller('CoursesController', ['$scope', '$stateParams', 'Global', 'Courses', '$location', 'MeanUser',
    function($scope, $stateParams, Global, Courses, $location, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'courses'
        };

        $scope.find = function() {
            Courses.query(function(courses) {
                $scope.courses = courses;
            });
        };

        $scope.create = function(isValid) {
            if(isValid) {

                var course = new Courses({
                    title: $scope.title,
                    courseNumber: $scope.courseNumber,
                    description: $scope.description,
                    professor: $scope.professor,
                    questions: $scope.questions,
                    students: $scope.students,
                    created: $scope.created,
                    __v: $scope.__v
                });

                course.$save(function(response){
                   $location.path('courses/' + response._id);
                });

                $scope.title = '';
                $scope.courseNumber = 0;
                $scope.description = '';
                $scope.professor = '';
                $scope.questions = [];
                $scope.students = [];
                $scope.created = '';
                $scope.__v = 0;


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



    }
]);
