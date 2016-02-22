'use strict';

//Question service used for questions REST endpoint
angular.module('mean.questions').factory('Questions', ['$resource',
  function($resource) {
    return $resource('api/questions/:questionId', {
      questionId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      vote: {
        method: 'PUT'
      }
    });
  }
]);
