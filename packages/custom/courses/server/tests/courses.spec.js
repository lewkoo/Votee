/**
 * Created by lewkoo on 2016-01-27.
 */
'use strict';

/**
 * Model module dependencies.
 */

var expect = require('expect.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Course = mongoose.model('Course'),
    mean = require('meanio'),
    server = request.agent("http://localhost:" + mean.config.clean.http.port);


/**
 * Globals
 */
var professor;
var students = [];
var course;
var course_2;

/**
 * Test Suites
 */

var generateRandomStudent = function generateRandomStudent(studentSequenceNumber) {

    return new User({
        name: 'Student ' + studentSequenceNumber,
        email: 'student' + studentSequenceNumber + '@university.ca',
        username: 'student' + studentSequenceNumber,
        password: 'iwillpassthrough'
    });

};

function generateProfsAndStudents() {

    professor = new User({
        name: 'Some professor',
        email: 'prof@university.ca',
        username: 'number1Prof1972',
        password: 'youshallnotpass'
    });

    professor.roles.push('professor');
    professor.save();

    for (var i = 0; i < 5; i++) {
        var student = generateRandomStudent(i);
        student.roles.push('student');
        student.save();
        students.push(student);
    } // generate 5 students

}
describe('<Unit Test>', function () {

    describe('Model Course:', function () {
        beforeEach(function (done) {
            this.timeout(10000);

            generateProfsAndStudents();

            course = new Course({
                title: 'Test Course 1',
                courseNumber: 4350,
                description: 'This is a test 1',
                professor: professor,
                students: students
            });

            course_2 = new Course({
                title: 'Test Course 2',
                courseNumber: 4350,
                description: 'This is a test 2',
                professor: professor,
                students: students
            });

            done();
        }); // END of beforeEach

        describe('Method Save', function () {

            it('it should be able to save a course without problems', function (done) {
                this.timeout(10000);

                return course.save(function (err, data) {
                    expect(err).to.be(null);
                    expect(data.title).to.equal('Test Course 1');
                    expect(data.description).to.equal('This is a test 1');
                    expect(data.professor.length).to.not.equal(0);
                    expect(data.students.length).to.equal(5);
                    expect(data.created.length).to.not.equal(0);
                    done();
                });
            });

            it('it should be throwing an error when course number is not provided', function (done) {
                this.timeout(10000);
                course.courseNumber = null;

                return course.save(function (err, data) {
                    expect(err).to.not.be(null);
                    done();
                });
            });

            it('it should be throwing an error when course number is not unique', function (done) {
                this.timeout(10000);

                // Save the first course. No errors should be produced
                course.save(function (err, data) {
                    expect(err).to.be(null);
                });

                // Saving the course_2 with the same course number should give an error
                return course_2.save(function (err, data) {
                    expect(err).to.not.be(null);
                    done();
                });

            });

            it('it should be throwing an error when course title is not provided', function (done) {
                this.timeout(10000);
                course.title = '';

                return course.save(function (err, data) {
                    expect(err).to.not.be(null);
                    done();
                });
            });

            it('it should be throwing an error when you try to save a course without a professor', function (done) {
                this.timeout(10000);
                course.professor = null;

                return course.save(function (err, data) {
                    expect(err).to.not.be(null);
                    done();
                });
            });
        }); // END of Save method tests

        afterEach(function (done) {
            this.timeout(10000);
            course.remove(function () {
                professor.remove();
                students.forEach(function (entry) {
                    entry.remove();
                });
                // clear the array
                students.splice(0,students.length);
            });

            course_2.remove(function () {
                professor.remove();
                students.forEach(function (entry) {
                    entry.remove();
                });

                // clear the array
                students.splice(0,students.length);
                done();
            });

        });

    }); // END of Course model tests

    describe('Controller Course:', function () {
        beforeEach(function (done) {
            this.timeout(10000);

            generateProfsAndStudents();

            professor.password = "test";

            course = new Course({
                title: 'Test Course 1',
                courseNumber: 4350,
                description: 'This is a test 1',
                professor: professor,
                students: students
            });

            // save that course in the testing DB
            course.save();


            // log in
            var loginJSON = new Object();
            loginJSON.email = professor.email;
            loginJSON.password = professor.password;
            var jsonString= JSON.stringify(loginJSON);

            /**
            server.post('/api/login')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                .send(jsonString)
                .expect(200)
                .end(function (err, res){

                    console.log(err);
                });
            */

            done();
        });

        describe('Testing the GET routes', function () {

            it('it should be able to get the list of courses', function (done) {

                this.timeout(10000);

                // prepare the request
                server.get('/api/courses/') // request route - look for routes/courses.js
                    .set('Accept', 'application/json')// request type - in this case, we want a JSON
                    .expect('Content-Type', /json/) // specify the format to be JSON
                    .expect(200) // specify the response code
                    .end(function (err, res) { // perform this code when the request goes through

                        // Perform validations, baby!
                        res.body.should.be.type('object');
                        res.body[0].should.have.property('title', course.title);
                        res.body[0].should.have.property('courseNumber', course.courseNumber);
                        res.body[0].should.have.property('description', course.description);
                        res.body[0].should.have.property('professor', course.professor.id);
                        res.body[0].should.have.property('students').and.have.lengthOf(5);
                        res.body[0].should.have.property('questions').and.have.lengthOf(0);

                        done();

                    });


            });

        });

        describe('Testing incorrect route', function (){

            it('it should be throwing an error when trying to access an incorrect route', function (done){

                this.timeout(10000);

                server.get('/api/courses/12123123123123')
                    .expect(500)
                    .end(function (err, res){
                        expect(err).to.not.be(null);
                        done();
                    });

                done();

            });

        });

        describe('Testing the POST routes', function () {

            it('it should be able to post a new course', function (done){
                // prepare the object to be sent
                course.courseNumber = 1122;
                course.title = "Testing course 2";
                var jsonPOSTString = JSON.stringify(course);

                //console.log(jsonPOSTString);

                // prepare the request. Note that this one is using the post method!
                server.post('/api/courses/') // request route - look for routes/courses.js
                    .send(jsonPOSTString)
                    .expect(200)
                    .end(function (err, res){
                        console.log("Response received!");
                        console.log(err);
                        expect(err).to.be(null);

                    });

                done();
            });

        });

        //describe('Testing the ')

        afterEach(function (done) {
            this.timeout(10000);
            course.remove(function () {
                professor.remove();
                students.forEach(function (student) {
                    student.remove();
                });
                // clear the array
                students.splice(0,students.length);
                done();
            });


        });

    }); // END of Course controller tests

});// END of description of Unit Test Suite;