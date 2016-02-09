'use strict';

/* jshint -W098 */
angular.module('mean.questions').controller('QuestionsController', ['$scope', '$stateParams', 'Global', 'Questions', '$location', 'MeanUser', 'Circles',
    function($scope,$stateParams, Global, Questions, $location, MeanUser, Circles) {
        $scope.global = Global;
        $scope.package = {
            name: 'questions'
        };

        $scope.hasAuthorization = function(question) {
            return MeanUser.isProfessor;
        };

        //$scope.isAuthorized = MeanUser.isProfessor;

        $scope.availableCircles = [];
        //store options text in the array
        $scope.optionsText = [];

        Circles.mine(function(acl) {
            $scope.availableCircles = acl.allowed;
            $scope.allDescendants = acl.descendants;
        });

        $scope.create = function(isValid) {
            if (isValid) {
                var question = new Questions($scope.question);

                question.$save(function(response) {
                    $location.path('questions/' + response._id);
                });

                $scope.question = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.find = function() {
            Questions.query(function(questions) {
                $scope.questions = questions;
            });
        };

        $scope.findOne = function() {
            Questions.get({
                questionId: $stateParams.questionId
            }, function(question) {
                $scope.question = question;
            });
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var question = $scope.question;
                console.log(question);
                if (!question.updated) {
                    question.updated = [];
                }
                question.updated.push(new Date().getTime());

                question.$update(function() {
                    $location.path('questions/' + question._id);
                });
            } else {
                $scope.submitted = true;
            }
        };

        $scope.remove = function(question) {
            console.log(question);
            if (question) {
                question.$remove(function(response) {
                    for (var i in $scope.questions) {
                        if ($scope.questions[i] === article) {
                            $scope.questions.splice(i, 1);
                        }
                    }
                    $location.path('questions');
                });
            } else {
                $scope.article.$remove(function(response) {
                    $location.path('questions');
                });
            }
        };

    }
]);
