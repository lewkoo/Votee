'use strict';

/* jshint -W098 */
angular.module('mean.voteeHome').controller('VoteeHomeController', ['$scope','$stateParams', '$location', 'Global', 'VoteeHome', '$location',
    'MeanUser', '$state',
  function($scope,  Global, VoteeHome, $location, MeanUser, $state) {
	$scope.global = Global;
	$scope.package = {
	  name: 'voteeHome'
	};

    console.log($scope);
    console.log(VoteeHome);
    console.log(Global);
    console.log($location);
    console.log(MeanUser);
      console.log($state);

  }
]);
