'use strict';

/* jshint -W098 */
angular.module('mean.questions').controller('QuestionsController', ['$scope', 'Global', 'Questions',
  function($scope, Global, Questions) {
    $scope.global = Global;
    $scope.package = {
      name: 'questions'
    };
  }
]);
