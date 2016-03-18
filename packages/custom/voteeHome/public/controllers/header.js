'use strict';

angular.module('mean.voteeHome').controller('VoteeHeaderController', ['$scope', '$rootScope', 'Menus', 'MeanUser', '$state',
  function($scope, $rootScope, Menus, MeanUser, $state) {

	var vm = this;

	vm.menus = {};
	vm.hdrvars = {
	    authenticated: MeanUser.loggedin,
	    user: MeanUser.user,
	    isAdmin: MeanUser.isAdmin,
        isProfessor: MeanUser.isProfessor,
		isStudent: MeanUser.isStudent,
		userId: MeanUser.userId
	};

	// Default hard coded menu items for main menu
	var defaultMainMenu = [];

	// Query menus added by modules. Only returns menus that user is allowed to see.
	function queryMenu(name, defaultMenu) {

	  Menus.query({
		name: name,
		defaultMenu: defaultMenu
	  }, function(menu) {
		vm.menus[name] = menu;
	  });
	}

	// Query server for menus and check permissions
	queryMenu('voteeMain', defaultMainMenu);
	queryMenu('account', []);


	$scope.isCollapsed = false;

	$rootScope.$on('loggedin', function() {
	  queryMenu('voteeMain', defaultMainMenu);

	  vm.hdrvars = {
        authenticated: MeanUser.loggedin,
        user: MeanUser.user,
		student: MeanUser.isStudent,
		professor: MeanUser.isProfessor,
		isAdmin: MeanUser.isAdmin
	  };
	});

	vm.logout = function(){
	  MeanUser.logout();
	};

	$rootScope.$on('logout', function() {
	  vm.hdrvars = {
		authenticated: false,
		user: {},
        student: false,
        professor: false,
		isAdmin: false
	  };
	  queryMenu('voteeMain', defaultMainMenu);
	  $state.go('home');
	});

  }
]);
