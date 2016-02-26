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

        /*
         * Returns a sample JSON response without Mongo ID
         * */
        var postCourseData = function() {
            return {
                'title' : 'Test Course 1',
                'courseNumber' : 4350,
                'description' : 'This is a test 1',
                'professor' : '56c8bdfaf82d7bd71d40de02',
                'questions' : [],
                'students' : [
                    '56c8bdfaf82d7bd71d40de03',
                    '56c8bdfaf82d7bd71d40de04',
                    '56c8bdfaf82d7bd71d40de05',
                    '56c8bdfaf82d7bd71d40de06',
                    '56c8bdfaf82d7bd71d40de07'
                ],
                'created' : '2016-02-20T19:26:50.874Z',
                '__v' : 0
            };
        };

        /*
         *
         * Returns a sample JSON response with a Mongo ID
         * */
        var testCourseData = function() {
            var additionalData = postCourseData();
            additionalData._id = '56c8bdfaf82d7bd71d40de08';
            return additionalData;
        };

        describe('find() function tests', function () {

            it('$scope.find() should list courses if server makes them available', function() {

                // mock the expected response to a GET request

                $httpBackend.expectGET(/api\/courses$/).respond([{
                    '_id' : '56c8bdfaf82d7bd71d40de08',
                    'title' : 'Test Course 1',
                    'courseNumber' : 4350,
                    'description' : 'This is a test 1',
                    'professor' : '56c8bdfaf82d7bd71d40de02',
                    'questions' : [],
                    'students' : [
                        '56c8bdfaf82d7bd71d40de03',
                        '56c8bdfaf82d7bd71d40de04',
                        '56c8bdfaf82d7bd71d40de05',
                        '56c8bdfaf82d7bd71d40de06',
                        '56c8bdfaf82d7bd71d40de07'
                    ],
                    'created' : '2016-02-20T19:26:50.874Z',
                    '__v' : 0
                }]);

                scope.find();
                $httpBackend.flush();

                // test the return value
                expect(scope.courses[0]).toEqualData(testCourseData());

            });

            it('$scope.find() should list no courses if server returns nothing', function() {


                $httpBackend.expectGET(/api\/courses$/).respond([{
                    // return nothing
                }]);

                scope.find();
                $httpBackend.flush();

                // test the return value
                expect(scope.courses[0]).toEqualData({});
            });

        });

        describe('findOne() function tests', function() {

            it('$scope.findOne() should find a course', function() {

                // fixture URL parament
                $stateParams.courseId = '525a8422f6d0f87f0e407a33';

                // fixture response object

                // test expected GET request with response object
                $httpBackend.expectGET('api\/courses\/' + $stateParams.courseId).respond(postCourseData());

                // run controller
                scope.findOne();
                $httpBackend.flush();

                // test scope value
                expect(scope.course).toEqualData(postCourseData());

            });
        });

        describe('create() function tests ', function() {

            it('$scope.create() with valid form data should send a POST request ' +
                'with the form input values and then ' +
                'locate to new object URL', function() {

                $httpBackend.when('GET','/courses/views/view.html').respond(200);

                // fixture mock form input values
                scope.title = 'Test Course 1';
                scope.courseNumber = 4350;
                scope.description = 'This is a test 1';
                scope.professor = '56c8bdfaf82d7bd71d40de02';
                scope.questions = [];
                scope.students = [
                    '56c8bdfaf82d7bd71d40de03',
                    '56c8bdfaf82d7bd71d40de04',
                    '56c8bdfaf82d7bd71d40de05',
                    '56c8bdfaf82d7bd71d40de06',
                    '56c8bdfaf82d7bd71d40de07'
                ];
                scope.created = '2016-02-20T19:26:50.874Z';
                scope.__v = 0;

                // test post request is sent
                $httpBackend.expectPOST('api\/courses', postCourseData()).respond(testCourseData());

                // Run controller
                scope.create(true);
                $httpBackend.flush();

                // test form input(s) are reset
                expect(scope.title).toEqual('');
                expect(scope.courseNumber).toEqual(0);
                expect(scope.description).toEqual('');
                expect(scope.professor).toEqual('');
                expect(scope.questions).toEqual([]);
                expect(scope.students).toEqual([]);
                expect(scope.created).toEqual('');
                expect(scope.__v).toEqual(0);

                // test URL location to new object
                expect($location.path()).toBe('/courses/' + testCourseData()._id);

            });

        });

        describe('update() function tests ', function() {

            it('$scote.update() with valid form data should send a PUT request ' +
                'with the form input values and then ' +
                'locate to updated object URL', function(Courses){

                // mock course object from form
                var course = new Courses(testCourseData());

                // mock article in scope
                scope.course = course;

                // test PUT happens correctly
                $httpBackend.expectPUT(/api\/courses\/([0-9a-fA-F]{24})$/, testCourseData()).respond();

                // run controller
                scope.update(true);
                $httpBackend.flush();

                // test URL location to new object
                expect($location.path()).toBe('/courses/' + testCourseData()._id);

            });

        });

        describe('remove() function tests ', function() {

            it('$scope.remove() with valid form data should send a DELETE request ' +
                'with the form intput values and then ' +
                'locate to updated object URL', function(Courses){

                // fixture rideshare
                var course = new Courses({
                    _id: '56c8bdfaf82d7bd71d40de08'
                });

                // mock rideshares in scope
                scope.courses = [];
                scope.courses.push(course);

                // test expected rideshare DELETE request
                $httpBackend.expectDELETE(/api\/courses\/([0-9a-fA-F]{24})$/).respond(204);

                // run controller
                scope.remove(course);
                $httpBackend.flush();

                // test after successful delete URL location articles list
                //expect($location.path()).toBe('/articles');
                expect(scope.courses.length).toBe(0);

            });

        });

        describe('canCreateCourses function tests', function(MeanUser){

            it('canCreateCourses should return true if MeanUser is a professor and/or admin', function(){



            });


        });

    });

}());