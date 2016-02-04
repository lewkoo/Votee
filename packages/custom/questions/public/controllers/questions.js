'use strict';

/* jshint -W098 */
angular.module('mean.questions').controller('QuestionsController', ['$scope', 'Global', 'Questions', '$location', 'MeanUser', 'Circles',
    function($scope, Global, Questions, $location, MeanUser, Circles) {
        $scope.global = Global;
        $scope.package = {
            name: 'questions'
        };

        $scope.find = function() {
            Questions.query(function(questions) {
                $scope.questions = questions;
            });
        };

    }
]);
