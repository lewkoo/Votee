'use strict';

/* jshint -W098 */
angular.module('mean.questions').controller('QuestionsController', ['$scope', '$stateParams', 'Global', 'Questions', '$location', 'MeanUser', 'Circles', '$http',
    function($scope,$stateParams, Global, Questions, $location, MeanUser, Circles, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'questions'
        };

        $scope.hasAuthorization = function(question) {
            return MeanUser.isProfessor;
        };

        //$scope.isAuthorized = MeanUser.isProfessor;

        $scope.hasVoted = function(question){
            var equal = false;

            for(var key in question.answers){
                var answer = question.answers[key];

                var creator = answer.student;

                if(angular.equals(answer.student._id, MeanUser.userId)){
                        equal = true;
                        break;
                }
            }
            return equal;
        };

        $scope.availableCircles = [];
        //store options text in the array
        $scope.optionsText = [];
        $scope.selectedAnswer = { index: 0 };

        //$scope.setSelected = function(selected) {
        //    console.log(selected);
        //    $scope.selected = selected;
        //}

        //$scope.selectedAnswer ;

        Circles.mine(function(acl) {
            $scope.availableCircles = acl.allowed;
            $scope.allDescendants = acl.descendants;
        });

        $scope.create = function(isValid) {
            if (isValid) {
                //var question = new Questions($scope.question);

                var question = new Questions({
                    'title': $scope.question.title,
                    'options': $scope.question.options,
                    'answer': $scope.question.answer,
                    'answers': $scope.question.answers,
                    'type': $scope.question.type,
                    //'created": "2016-02-25T19:26:48.686Z',
                    '__v': 1
                });

                question.$save(function(response) {
                    $location.path('questions/' + response._id);
                });

                $scope.question = {};

            } else {
                $scope.submitted = true;
            }
        };

        $scope.vote = function(question) {
            console.log('Submitting vote');
            var question = $scope.question;
            //add selected answer to reques
            question.selectedAnswer = $scope.selectedAnswer.index;

            if (!question.updated) {
                question.updated = [];
            }
            question.updated.push(new Date().getTime());

            question.$vote(function() {
                $location.path('questions/vote/' + question._id);
            });

            console.log('END of function');

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
                //console.log($scope.question.options[0]);
            });
        };

        $scope.update = function(isValid) {
            if (isValid) {
                var question = $scope.question;
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
                        if ($scope.questions[i] === question) {
                            $scope.questions.splice(i, 1);
                        }
                    }
                    $location.path('questions');
                });
            } else {
                $scope.question.$remove(function(response) {
                    $location.path('questions');
                });
            }
        };

        $scope.submitAnswer = function(form){
            console.log(form)
        }

    }
]);
