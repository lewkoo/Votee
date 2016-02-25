/**
 * Created by lewkoo on 2016-02-23.
 */
'use strict';

(function() {
    describe('Courses front end controller', function () {

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
            module('mean.courses');
        });

        // Initialize the controller and a mock scope
        var CoursesController,
            scope,
            $httpBackend,
            $stateParams,
            $location;

        // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
        // This allows us to inject a service but then attach it to a variable
        // with the same name as the service.
        beforeEach(inject(function($controller, $rootScope, $injector, _$location_, _$stateParams_, _$httpBackend_) {

            scope = $rootScope.$new();

            CoursesController = $controller('CoursesController', {
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

        var testCourseData = function() {
          return {
              "_id" : "56c8bdfaf82d7bd71d40de08",
              "title" : "Test Course 1",
              "courseNumber" : 4350,
              "description" : "This is a test 1",
              "professor" : "56c8bdfaf82d7bd71d40de02",
              "questions" : [],
              "students" : [
                  "56c8bdfaf82d7bd71d40de03",
                  "56c8bdfaf82d7bd71d40de04",
                  "56c8bdfaf82d7bd71d40de05",
                  "56c8bdfaf82d7bd71d40de06",
                  "56c8bdfaf82d7bd71d40de07"
              ],
              "created" : "2016-02-20T19:26:50.874Z",
              "__v" : 0
          };
        };

        it('$scope.find() should find courses ', function() {

            // mock the expected response to a GET request

            $httpBackend.expectGET(/api\/courses$/).respond([{
                "_id" : "56c8bdfaf82d7bd71d40de08",
                "title" : "Test Course 1",
                "courseNumber" : 4350,
                "description" : "This is a test 1",
                "professor" : "56c8bdfaf82d7bd71d40de02",
                "questions" : [],
                "students" : [
                    "56c8bdfaf82d7bd71d40de03",
                    "56c8bdfaf82d7bd71d40de04",
                    "56c8bdfaf82d7bd71d40de05",
                    "56c8bdfaf82d7bd71d40de06",
                    "56c8bdfaf82d7bd71d40de07"
                ],
                "created" : "2016-02-20T19:26:50.874Z",
                "__v" : 0
            }]);
            
            scope.find();
            $httpBackend.flush();

            // test the return value
            expect(scope.courses[0]).toEqualData(testCourseData());

        });

    });


}());