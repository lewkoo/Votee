'use strict';

(function() {

    describe('voteeHome', function() {

        beforeEach(function() {
            module('mean');
            module('mean.voteeHome');
        });

        var $controller;

        var controller;
        var $scope;

        beforeEach(inject(function(_$controller_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $controller = _$controller_;
        }));

        describe('voteeHome controller', function() {
            beforeEach(function() {
                $scope = {};
                controller = $controller('VoteeHomeController', { $scope: $scope });
            });

            it('should expose some global scope', function() {
              expect(true).toBeTruthy();
            });
        });

        describe('header controller', function() {

            beforeEach(function() {
                $scope = {};
                controller = $controller('VoteeHeaderController', { $scope: $scope });
            });

            it('Has a menu',
            function() {
                expect(controller.menus).toBeDefined();
                expect(controller.menus).not.toBeNull();
                expect(controller.menus.length).not.toBe(0);
            });
        });
    });

}());
