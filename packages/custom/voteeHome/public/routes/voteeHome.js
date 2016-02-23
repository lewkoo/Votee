'use strict';

angular.module('mean.voteeHome').config(['$viewPathProvider','$stateProvider',
  function($viewPathProvider, $stateProvider) {
    //$stateProvider.state('voteeHome example page', {
    //  url: '/voteeHome/example',
    //  templateUrl: 'voteeHome/views/index.html'
    //});
      $viewPathProvider.override('system/views/index.html', 'voteeHome/views/index.html');

      $stateProvider.state('Students', {
        url: '/student/profile',
        templateUrl: 'voteeHome/views/student.html'
      });

      //implement professor main page
      $stateProvider.state('Professors', {
          url: '/professors/profile',
          templateUrl: 'voteeHome/views/prof.html'
      });

      $stateProvider.state('ProfLearnMore', {
          url: '/profLearnMore',
          templateUrl: 'voteeHome/views/profLearnMore.html'
      });

      $stateProvider.state('StudentLearnMore', {
          url: '/studentLearnMore',
          templateUrl: 'voteeHome/views/studentLearnMore.html'
      });

      $stateProvider.state('Tutorial', {
          url: '/tutorial',
          templateUrl: 'voteeHome/views/tutorial.html'
      });
  }
]);

