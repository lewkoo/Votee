'use strict';

(function() {

    describe("voteeHome", function() {

        beforeEach(module('mean.voteeHome'));

        var $controller;

        beforeEach(inject(function(_$controller_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe("voteeHome controller", function() {
            beforeEach(function() {
                var $scope = {};
                var controller = $controller('VoteeHomeController', { $scope: $scope });
            });

            it("stub", function() {
                expect(true).toBe(true);
            });
        });

        describe("header controller", function() {

            beforeEach(function() {
                var $scope = {};
                var controller = $controller('VoteeHeaderController', { $scope: $scope });
            });

            it("Has a menu",
            function() {
                expect($scope.menus).toBeDefined();
                expect($scope.menus).not.toBeNull();
                expect($scope.menus.length).not.toBe(0);
            });
        });
    });

}());
