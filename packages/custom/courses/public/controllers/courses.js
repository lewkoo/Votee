'use strict';

/* jshint -W098 */
angular.module('mean.courses').controller('CoursesController', ['$scope', '$stateParams', 'Global', 'Courses', '$location', 'MeanUser', 'Circles', '$http',
    function($scope, $stateParams, Global, Courses, $location, MeanUser, Circles, $http) {
        $scope.global = Global;
        $scope.package = {
            name: 'courses'
        };

        $scope.find = function() {
            Courses.query(function(courses) {
                $scope.courses = courses;
            });
        };

    }
]);
