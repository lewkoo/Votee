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

        var postQuestionData = function() {
            return {
                //'_id': '56cf5578b387fd7c940cb9be',
                //'creator': '56b2a9b3897e13640eeba6e9',
                'title': 'New q',
                'options': {'0': 'sdsdj', '1': 'kkk', '2': 'nnn', '3': 'dfd'},
                'answer': '2',
                'answers': [
                    '56cf557fb387fd7c940cb9bf'
                ],
                'type': 'MULTIPLE-CHOICE',
                //'created': '2016-02-25T19:26:48.686Z',
                '__v': 1
            };
        }; //testQuestionsData

        var postQuestionID = function(){
          return {
              '_id': '56cf5578b387fd7c940cb9be'
          }
        };

        /*
         * returns a simple JSON response with a MONGO ID
         */
        var testQuestionData = function(){
            var additionalData = postQuestionData();
            additionalData._id = '56cf5578b387fd7c940cb9be';
            return additionalData;
        };

        it('$scope.find() should find questions ', function() {

            // mock the expected response to a GET request

            $httpBackend.expectGET(/api\/questions$/).respond([{
                '_id': '56cf5578b387fd7c940cb9be',
                //'creator': '56b2a9b3897e13640eeba6e9',
                'title': 'New q',
                'options': {'0': 'sdsdj', '1': 'kkk', '2': 'nnn', '3': 'dfd'},
                'answer': '2',
                'answers': [
                    '56cf557fb387fd7c940cb9bf'
                ],
                'type': 'MULTIPLE-CHOICE',
                //'created': '2016-02-25T19:26:48.686Z',
                '__v': 1
            }]);

            scope.find();
            $httpBackend.flush();

            // test the return value
            expect(scope.questions[0]).toEqualData(testQuestionData());

        });

        it('$scope.find() should list no questions if server returns nothing', function(){
            $httpBackend.expectGET(/api\/questions$/).respond([{
                // return nothing
            }]);

            scope.find();
            $httpBackend.flush();

            // test the return value
            expect(scope.questions[0]).toEqualData({});
        });

        it('$scope.findOne() should create an array with one question object fetched ' +
            'from XHR using a questionID URL parameter', function() {
            // fixture URL parament
            $stateParams.questionId = '56cf5578b387fd7c940cb9be';

            // test expected GET request with response object
            $httpBackend.expectGET('api\/questions\/'+ $stateParams.questionId).respond(testQuestionData());

            // run controller
            scope.findOne();
            $httpBackend.flush();

            //console.log(scope.questions);
            // test scope value
            expect(scope.question).toEqualData(testQuestionData());

        });


        it('$scope.create() with valid form data should send a POST request ' +
            'with the form input values and then ' +
            'locate to new object URL', function() {

            $httpBackend.when('GET','/questions/views/view.html').respond(200);

            //'creator': '56b2a9b3897e13640eeba6e9',
            //    'title': 'New q',
            //    'options': {'0': 'sdsdj', '1': 'kkk', '2': 'nnn', '3': 'dfd'},
            //'answer': '2',
            //    'answers': [
            //    '56cf557fb387fd7c940cb9bf'
            //],
            //    'type': 'MULTIPLE-CHOICE',
            //    'created': '2016-02-25T19:26:48.686Z',
            //    '__v': 1
            // fixture mock form input values
            scope.question = {};
            scope.question.title = 'New q';
            scope.question.options =  {'0': 'sdsdj', '1': 'kkk', '2': 'nnn', '3': 'dfd'};
            scope.question.answer = '2';
            //scope.professor = '56c8bdfaf82d7bd71d40de02';
            scope.question.type = 'MULTIPLE-CHOICE';
            scope.question.answers = [
                '56cf557fb387fd7c940cb9bf'
            ];
            scope.question.created = '2016-02-25T19:26:48.686Z';
            scope.question.__v = 1;

            // test post request is sent
            $httpBackend.expectPOST('api\/questions', postQuestionData()).respond(testQuestionData());

            // Run controller
            scope.create(true);
            $httpBackend.flush();

            //console.log(scope.question);
            // test form input(s) are reset
            expect(scope.question.title).not.toBeDefined();
            expect(scope.question.options).not.toBeDefined();
            expect(scope.question.answer).not.toBeDefined();
            expect(scope.question.type).not.toBeDefined();
            expect(scope.question.answers).not.toBeDefined();
            expect(scope.question.__v).not.toBeDefined();

            // test URL location to new object
            expect($location.path()).toBe('/questions/' + postQuestionID()._id);

        });

        it('$scote.update() with valid form data should send a PUT request ' +
            'with the form input values and then ' +
            'locate to updated object URL', function(Questions){

            // mock question object from form
            var question = new Questions(testQuestionData());

            // mock question in scope
            scope.question = question;

            // test PUT happens correctly
            $httpBackend.expectPUT(/api\/courses\/([0-9a-fA-F]{24})$/, testQuestionData()).respond();

            // run controller
            scope.update(true);
            $httpBackend.flush();

            // test URL location to new object
            expect($location.path()).toBe('/courses/' + testQuestionData()._id);

        });

        it('$scope.remove() with valid form data should send a DELETE request ' +
            'with the form input values and then ' +
            'locate to updated object URL', function(Questions){

            // fixture rideshare
            var question = new Questions({
                _id: '56cf5578b387fd7c940cb9be'
            });

            // mock rideshares in scope
            scope.questions = [];
            scope.questions.push(question);

            // test expected rideshare DELETE request
            $httpBackend.expectDELETE(/api\/courses\/([0-9a-fA-F]{24})$/).respond(204);

            // run controller
            scope.remove(course);
            $httpBackend.flush();

            // test after successful delete URL location articles list
            //expect($location.path()).toBe('/articles');
            expect(scope.questions.length).toBe(0);

        });



    });

}());
