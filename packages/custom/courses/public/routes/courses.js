'use strict';

angular.module('mean.courses').config(['$stateProvider',
    function($stateProvider) {
        $stateProvider
            .state('Courses', {
                url: '/courses',
                templateUrl: 'courses/views/list.html'
            })
            .state('create course', {
                url: '/courses/create',
                templateUrl: 'courses/views/create.html',
                requiredCircles: {
                    circles: ['can create courses']
                }
            })
            .state('edit course', {
                url: '/courses/:courseId/edit',
                templateUrl: 'courses/views/edit.html',
                requiredCircles: {
                    circles: ['can edit courses']
                }
            })
            .state('course by id', {
                url: '/courses/:courseId',
                templateUrl: '/courses/views/view.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            });
    }
]);
