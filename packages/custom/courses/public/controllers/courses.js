'use strict';

/* jshint -W098 */
angular.module('mean.courses').controller('CoursesController', ['$scope', 'Global', 'Courses',
  function($scope, Global, Courses) {
    $scope.global = Global;
    $scope.package = {
      name: 'courses'
    };
  }
]);
