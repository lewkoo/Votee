'use strict';

/* jshint -W098 */
angular.module('mean.courses').controller('CoursesController', ['$scope', '$stateParams', 'Global', 'Courses', '$location', 'MeanUser',
    function($scope, $stateParams, Global, Courses, $location, MeanUser) {
        $scope.global = Global;
        $scope.package = {
            name: 'courses'
        };

        $scope.canCreateCourses = function()
        {
            return (MeanUser.isProfessor || MeanUser.isAdmin);
        };

        $scope.canEditCourses = $scope.canCreateCourses;

        $scope.hasAuthorization = function(course) {
            if (!course || !course.user) return false;
            return MeanUser.isAdmin || course.user._id === MeanUser.user._id;
        };

        $scope.find = function() {
            Courses.query(function(courses) {
                $scope.courses = courses;
            });
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
                    __v: $scope.__v
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
