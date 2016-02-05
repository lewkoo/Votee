'use strict';

/* jshint -W098 */
angular.module('mean.questions').controller('QuestionsController', ['$scope', '$stateParams', 'Global', 'Questions', '$location', 'MeanUser', 'Circles',
    function($scope,$stateParams, Global, Questions, $location, MeanUser, Circles) {
        $scope.global = Global;
        $scope.package = {
            name: 'questions'
        };

        $scope.isAuthorized = MeanUser.isProfessor;
        //console.log($scope.isAuthorized);

        //default # of questions for prof
        $scope.numberOfQuestions = 4;

        $scope.create = function(isValid) {
            if (isValid) {
                var question = new Question($scope.question);

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

        $scope.create = function(isValid) {
            if (isValid) {
                var question = new Questions($scope.article);

                question.$save(function(response) {
                    $location.path('questions/' + response._id);
                });

                $scope.question = {};

            } else {
                $scope.submitted = true;
            }
        };

    }
]);
