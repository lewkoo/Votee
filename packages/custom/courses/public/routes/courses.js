'use strict';

angular.module('mean.courses').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('your courses', {
      url: '/courses',
      templateUrl: 'courses/views/index.html'
    });
  }
]);
