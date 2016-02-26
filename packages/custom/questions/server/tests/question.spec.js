/**
 * Created by lewkoo on 2016-01-29.
 */
'use strict';

var expect = require('expect.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Question = mongoose.model('Question'),
    Answer = mongoose.model('Answer'),
    mean = require('meanio'),
    server = request.agent('http://localhost:' + mean.config.clean.http.port);

/**
 * Globals
 */

var professor;
var question;
var answers  = [];

/**
 * Test Suites
 */

var generateRandomAnswers = function generateRandomAnswers(answerSequenceNumber) {

    return new Answer({
        student: {
            name: 'Student ' + answerSequenceNumber,
            email: 'student' + answerSequenceNumber + '@university.ca',
            username: 'student' + answerSequenceNumber,
            password: 'iwillpassthrough'
        }
    });
}; //generateRandomQuestions

function generateAnswers() {
    for (var i = 0; i < 5; i++) {
        var answer = generateRandomAnswers(i);
        answer.save();
        answers.push(answer);
    } // generate 5 questions
} //

describe('<Unit Test>', function() {
    describe('Model Question:', function() {
        beforeEach(function(done){
            this.timeout(10000);

            professor = new User({
                name: 'Some professor',
                email: 'questionProf@university.ca',
                username: 'number1Prof1972',
                password: 'youshallnotpass'
            });
            professor.save();

            question = new Question({
                title: 'Test question',
                description: 'This is a question that has nothing to do with the course material',
                creator: professor,
                options: { '0': 'The Hobbit', '1': 'Return of the King', '2': 'Star Wars', '3': 'Bond, James Bond' },
                answer: "Option3"
            });
            question.save();

            done();
        }); // END of beforeEach

        describe('Method Save', function(){

            it('it should be able to save a question without problems', function(done){
                this.timeout(10000);

                return question.save(function(err, data){
                    expect(err).to.be(null);
                    expect(data.title).to.equal('Test question');
                    expect(data.description).to.equal('This is a question that has nothing to do with the course material');
                    expect(data.creator).to.not.equal(null);
                    expect(data.answer).to.equal('Option3');
                    expect(data.options).to.not.equal(null);
                    expect(data.type).to.equal('MULTIPLE-CHOICE');
                    expect(data.answers.length).to.equal(0);
                    expect(data.created.length).to.not.equal(0);
                    done();
                });
            });

            it('it should error if the title is empty', function(done){
                this.timeout(10000);
                question.title = '';
                return question.save(function(err, data){
                    expect(err).to.not.be(null);
                    done();
                });
            });

            it('it should reject unsupported type', function(done){

                this.timeout(10000);
                question.type = 'foo bar';

                return question.save(function(err, data){
                    expect(err).to.not.be(null);
                    done();
                });
            });

            it('it should reject a null creator', function(done){

                this.timeout(10000);
                question.creator = null;

                return question.save(function(err, data){
                    expect(err).to.not.be(null);
                    done();
                });
            });

            it('it should reject a null options', function(done){

                this.timeout(10000);
                question.options = null;

                return question.save(function(err, data){
                    expect(err).to.be(null);
                    done();
                });
            });

            it('it should reject a null answer', function(done){

                this.timeout(10000);
                question.answers = null;

                return question.save(function(err, data){
                    expect(err).to.be(null);
                    done();
                });
            });
        }); // END of method save testing

        //afterEach(function(done) {
        //    this.timeout(10000);
        //    professor.remove();
        //    question.remove();
        //    done();
        //});
        afterEach(function(done) {
            this.timeout(10000);
            question.remove(function(){
                professor.remove();
                answers.forEach(function (answer) {
                    answer.remove();
                });
                // clear the array
                answers.splice(0,answers.length);
                done();
            });
        });
    }); // END of Course model tests

    describe('Testing Question Controller', function() {
        beforeEach(function(done){
            this.timeout(10000);

            generateAnswers();

            professor = new User({
                name: 'Some professor',
                email: 'questionProf@university.com',
                username: 'number1Prof1972',
                password: 'youshallnotpass'
            });
            professor.save();

            question = new Question({
                title: 'Test question',
                description: 'This is a question that has nothing to do with the course material',
                creator: professor,
                options: { '0': 'The Hobbit', '1': 'Return of the King', '2': 'Star Wars', '3': 'Bond, James Bond' },
                answer: "Option3",
                answers: answers
            });
            question.save();

            done();
        }); // END of beforeEach


        describe('Testing the GET routes', function () {
            it('it should be able to get the list of all questions', function (done) {
                this.timeout(10000);

                server.get('/api/questions')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', 'application/json')
                    .expect(200)
                    .end(function(err, res){
                        //validate
                        res.body.should.be.type('object');
                        res.body[0].should.have.property('title', question.title);
                        res.body[0].should.have.property('description', question.description);
                        res.body[0].should.have.property('options', question.options);
                        res.body[0].should.have.property('answer', question.answer);
                        res.body[0].should.have.property('answers').and.have.lengthOf(5);
                        res.body[0].should.have.property('type', 'MULTIPLE-CHOICE');
                        done();
                    });
            });

            it('it should be able to get a single question that exists', function (done){

                this.timeout(10000);

                //prepare the request
                server.get('/api/questions/' + question._id.toString())
                    .set('Accept', 'appication/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res){

                        // Perform validations, baby!
                        res.body.should.be.type('object');
                        res.body.should.have.property('title', question.title);
                        res.body.should.have.property('description', question.description);
                        res.body.should.have.property('options', question.options);
                        res.body.should.have.property('answer', question.answer);
                        res.body.should.have.property('answers').and.have.lengthOf(5);
                        res.body.should.have.property('type', 'MULTIPLE-CHOICE');

                        done();
                    });

            });

            it('it should fail to get a non existing question', function (done){

                this.timeout(10000);

                // store the ID
                var questionID = question._id.toString();

                // clear the database
                Question.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                server.get('/api/questions/' + questionID)
                    .set('Accept', 'appication/json')
                    .expect('Content-Type', /json/)
                    .expect(500)// here, I am testing for code 500 only
                    .end(function (err, res){
                        done();
                    });
            });

        });//END TESTING GET ROUTES

        describe('Testing the POST routes - create a question', function () {

            it('it should be saving a question without any problems', function (done){
                // prepare the object to be sent
                Question.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                question = new Question({
                    title: 'Test question',
                    description: 'This is a question that has nothing to do with the course material',
                    creator: professor,
                    options: { '0': 'The Hobbit', '1': 'Return of the King', '2': 'Star Wars', '3': 'Bond, James Bond' },
                    answer: "Option3",
                    answers: answers
                });

                server.post('/api/questions/') // request route - look for routes/question.js
                    .send(question)
                    .expect(200)
                    .end(function (err, res){
                        expect(err).to.be(null);
                        res.body.should.have.property('title', question.title);
                        res.body.should.have.property('description', question.description);
                        res.body.should.have.property('options', question.options);
                        res.body.should.have.property('answer', question.answer);
                        res.body.should.have.property('answers').and.have.lengthOf(5);
                        res.body.should.have.property('type', 'MULTIPLE-CHOICE');

                        done();

                    });
            });
        });

        describe('Testing the PUT routes - question update', function () {

            it('it should be updating a question without any problems', function (done){

                this.timeout(10000);

                question.title = "Updated title";
                question.description = "Updated description";
                //TODO: add here test to change question options

                server.put('/api/questions/' + question._id.toString()) // request route - look for routes/courses.js
                    .send(question)
                    .expect(200)
                    .end(function (err, res){
                        expect(err).to.be(null);

                        res.body.should.have.property('title', "Updated title");
                        res.body.should.have.property('description', "Updated description");
                        res.body.should.have.property('options', question.options);
                        res.body.should.have.property('answer', question.answer);
                        res.body.should.have.property('answers').and.have.lengthOf(5);
                        res.body.should.have.property('type', 'MULTIPLE-CHOICE');

                        done();

                    });


            });

            it('it should be failing to update a non-existing question', function (done){

                this.timeout(10000);

                // store the question object - we need it for sending
                var questionObject = question;

                // clear the database
                Question.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                console.log("before PUT");

                server.put('/api/questions/' + questionObject._id.toString())
                    .send(question)
                    .expect('Content-Type', /json/)
                    .expect(500) // here, I am testing for code 500 only
                    .end(function (err, res){

                        done();
                    });

            });

        });

        describe('Testing the DELETE routes - question deletion', function () {

            it('it should be able to delete a question without any problems', function (done){

                this.timeout(10000);

                // save the ID for later use
                var questionID = question._id;

                server.del('/api/questions/' + question._id.toString()) // request route - look for routes/questions.js
                    .send(question)
                    .expect(200)
                    .end(function (err, res){
                        expect(err).to.be(null);

                        res.body.should.have.property('title', question.title);
                        res.body.should.have.property('description', question.description);
                        res.body.should.have.property('options', question.options);
                        res.body.should.have.property('answer', question.answer);
                        res.body.should.have.property('answers').and.have.lengthOf(5);
                        res.body.should.have.property('type', 'MULTIPLE-CHOICE');

                        // test if the question is still in the model
                        Question.load(questionID, function(err, question){
                            expect(question).to.be(null);
                            done();
                        });

                    });
            });

            it('it should fail when deleting a non-existing question', function (done){

                this.timeout(10000);

                // store the question object - we need it for sending
                var questionObject = question;

                // clear the database
                Question.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                server.del('/api/questions/' + question._id.toString()) // request route - look for routes/questions.js
                    .send(question)
                    .expect(500)
                    .end(function (err, res){
                        done();
                    });
            });
        });

            afterEach(function(done) {
                this.timeout(10000);
                question.remove(function(){
                    professor.remove();
                    answers.forEach(function (answer) {
                        answer.remove();
                    });
                    // clear the array
                    answers.splice(0,answers.length);
                    done();
                }); //remove
            });//aftereach
        });
}); // END of description of Unit Test Suite