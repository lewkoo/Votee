'use strict';

angular.module('mean.questions').config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('Questions', {
                url: '/questions',
                templateUrl: 'questions/views/list.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('create question', {
                url: '/questions/create',
                templateUrl: '/questions/views/create.html',
                requiredCircles: {
                    circles: ['can create questions']
                }
            })
            .state('edit question', {
                url: '/questions/:questionId/edit',
                templateUrl: '/questions/views/edit.html',
                requiredCircles: {
                    circles: ['can edit questions']
                }
            })
            .state('question by id', {
                url: '/questions/:questionId',
                templateUrl: '/questions/views/view.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            })
            .state('vote', {
                url: '/questions/vote/:questionId',
                templateUrl: '/questions/views/vote.html',
                requiredCircles: {
                    circles: ['authenticated'],
                    denyState: 'auth.login'
                }
            });
    }
]);
