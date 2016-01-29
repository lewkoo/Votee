'use strict';

/* jshint -W098 */
angular.module('mean.voteeHome').controller('VoteeHomeController', ['$scope','$stateParams', '$location', 'Global', 'VoteeHome', '$location',
    'MeanUser', '$state',
  function($scope,  Global, VoteeHome, $location, MeanUser, $state) {
	$scope.global = Global;
	$scope.package = {
	  name: 'voteeHome'
	};
  }
]);
