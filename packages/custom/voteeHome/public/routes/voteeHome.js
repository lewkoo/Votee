'use strict';

angular.module('mean.voteeHome').config(['$viewPathProvider','$stateProvider',
  function($viewPathProvider, $stateProvider) {
    //$stateProvider.state('voteeHome example page', {
    //  url: '/voteeHome/example',
    //  templateUrl: 'voteeHome/views/index.html'
    //});
      $viewPathProvider.override('system/views/index.html', 'voteeHome/views/index.html');

  }
]);

