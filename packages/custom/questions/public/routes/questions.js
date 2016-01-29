'use strict';

angular.module('mean.questions').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('questions example page', {
      url: '/questions/example',
      templateUrl: 'questions/views/index.html'
    });
  }
]);
