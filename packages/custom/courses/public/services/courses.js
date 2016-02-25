'use strict';

// Courses service used for courses REST endpoint
angular.module('mean.articles').factory('Courses', ['$resource',
    function($resource) {
        return $resource('api/courses/:courseId', {
            articleId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);
