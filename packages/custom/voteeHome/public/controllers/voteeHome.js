'use strict';

/* jshint -W098 */
angular.module('mean.voteeHome').controller('VoteeHomeController', ['$scope', 'Global', 'VoteeHome',
  function($scope, Global, VoteeHome) {
    $scope.global = Global;
    $scope.package = {
      name: 'voteeHome'
    };
  }
]);
