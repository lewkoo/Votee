/**
 * Created by yuriy on 2016-02-24.
 */
'use strict';

(function() {
    describe('Questions front end controller', function () {
        //it('1 should be equals to 1', function () {
        //    expect(1).toBe(1);
        //});

        beforeEach(function() {
            jasmine.addMatchers({
                toEqualData: function() {
                    return {
                        compare: function(actual, expected) {
                            return {
                                pass: angular.equals(actual, expected)
                            };
                        }
                    };
                }
            });
        });

        beforeEach(function() {
            module('mean');
            module('mean.system');
            module('mean.questions');
            module('mean.courses');
        });

        // Initialize the controller and a mock scope
        var QuestionsController,
            scope,
            $httpBackend,
            $stateParams,
            $location;

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, $injector, _$location_, _$stateParams_, _$httpBackend_) {

            scope = $rootScope.$new();

            QuestionsController = $controller('QuestionsController', {
                $scope: scope
            });

            $stateParams = _$stateParams_;

            $httpBackend = _$httpBackend_;

            $location = _$location_;

            // mock these requests
            $httpBackend.expectGET('/api\/users\/me').respond(200);
            $httpBackend.when('GET','voteeHome\/views\/index.html').respond(200);
            $httpBackend.when('GET','/api\/circles\/mine').respond(200);

        }));

        var testQuetionsData = function() {
            return {
                "_id": "56cf5578b387fd7c940cb9be",
                "creator": "56b2a9b3897e13640eeba6e9",
                "title": "New q",
                "options": {"0": "sdsdj", "1": "kkk", "2": "nnn", "3": "dfd"},
                "answer": "2",
                "answers": [
                    "56cf557fb387fd7c940cb9bf"
                ],
                "type": "MULTIPLE-CHOICE",
                "created": "2016-02-25T19:26:48.686Z",
                "__v": 1
            };
        }; //testQuestionsData

        it('$scope.find() should find questions ', function() {

            // mock the expected response to a GET request

            $httpBackend.expectGET(/api\/questions$/).respond([{
                "_id": "56cf5578b387fd7c940cb9be",
                "creator": "56b2a9b3897e13640eeba6e9",
                "title": "New q",
                "options": {"0": "sdsdj", "1": "kkk", "2": "nnn", "3": "dfd"},
                "answer": "2",
                "answers": [
                    "56cf557fb387fd7c940cb9bf"
                ],
                "type": "MULTIPLE-CHOICE",
                "created": "2016-02-25T19:26:48.686Z",
                "__v": 1
            }]);

            scope.find();
            $httpBackend.flush();

            // test the return value
            expect(scope.questions[0]).toEqualData(testQuetionsData());

        });

        it('$scope.findOne() should create an array with one question object fetched ' +
            'from XHR using a questionID URL parameter', function() {
            // fixture URL parament
            $stateParams.questionId = '56cf5578b387fd7c940cb9be';

            // test expected GET request with response object
            $httpBackend.expectGET('api\/questions\/'+ $stateParams.questionId).respond(testQuetionsData());

            // run controller
            scope.findOne();
            $httpBackend.flush();

            //console.log(scope.questions);
            // test scope value
            expect(scope.question).toEqualData(testQuetionsData());

        });



    });

}());