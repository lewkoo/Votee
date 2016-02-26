/**
 * Created by lewkoo on 2016-01-27.
 */
'use strict';

/**
 * Model module dependencies.
 */

var request = require('supertest'),
    //should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Course = mongoose.model('Course'),
    mean = require('meanio'),
    server = request('http://localhost:' + mean.config.clean.http.port);


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

            professor.password = 'test';

            course = new Course({
                title: 'Test Course 1',
                courseNumber: 4350,
                description: 'This is a test 1',
                professor: professor,
                students: students
            });

            // save that course in the testing DB
            course.save();

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
                        res.body[0].should.have.property('professor');
                        res.body[0].professor._id.should.be.equal(course.professor.id.toString());
                        res.body[0].should.have.property('students').and.have.lengthOf(5);
                        res.body[0].should.have.property('questions').and.have.lengthOf(0);




                        done();

                    });


            });

            it('it should be able to get a single course that exists', function (done){

                this.timeout(10000);

                //prepare the request
                server.get('/api/courses/' + course._id.toString())
                    .set('Accept', 'appication/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function (err, res){

                        // Perform validations, baby!
                        res.body.should.be.type('object');
                        res.body.should.have.property('title', course.title);
                        res.body.should.have.property('courseNumber', course.courseNumber);
                        res.body.should.have.property('description', course.description);
                        res.body.should.have.property('professor');
                        res.body.professor._id.should.be.equal(course.professor.id.toString());
                        res.body.should.have.property('students').and.have.lengthOf(5);
                        res.body.should.have.property('questions').and.have.lengthOf(0);

                        done();
                    });



            });

            it('it should fail to get a non existing course', function (done){

                this.timeout(10000);

                // store the ID
                var courseId = course._id.toString();

                // clear the database
                Course.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                server.get('/api/courses/' + courseId)
                    .set('Accept', 'appication/json')
                    .expect('Content-Type', /json/)
                    .expect(500)// here, I am testing for code 500 only
                    .end(function (err, res){
                        done();
                    });
            });

        });

        describe('Testing the POST routes - create a course', function () {

            it('it should fail to save a duplicate course', function (done){
                // prepare the object to be sent
                course.courseNumber = 1122;
                course.title = 'Testing course 2';
                server.post('/api/courses/') // request route - look for routes/courses.js
                    .send(course)
                    .expect(200)
                    .end(function (err, res){
                        expect(err).to.not.be(null);
                        done();

                    });
            });

            it('it should be saving a course without any problems', function (done){
                // prepare the object to be sent
                Course.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                course = new Course({
                    title: 'Test Course 1',
                    courseNumber: 1122,
                    description: 'Testing course 2',
                    professor: professor,
                    students: students
                });

                server.post('/api/courses/') // request route - look for routes/courses.js
                    .send(course)
                    .expect(200)
                    .end(function (err, res){
                        expect(err).to.be(null);

                        res.body.should.have.property('title', course.title);
                        res.body.should.have.property('courseNumber', course.courseNumber);
                        res.body.should.have.property('description', course.description);
                        res.body.should.have.property('professor');
                        res.body.should.have.property('students').and.have.lengthOf(5);
                        res.body.should.have.property('questions').and.have.lengthOf(0);

                        done();

                    });


            });

        });

        describe('Testing the PUT routes - course update', function () {

            it('it should be updating a course without any problems', function (done){

                this.timeout(10000);

                course.title = 'Updated title';
                course.courseNumber = 8888;

                server.put('/api/courses/' + course._id.toString()) // request route - look for routes/courses.js
                    .send(course)
                    .expect(200)
                    .end(function (err, res){
                        expect(err).to.be(null);

                        res.body.should.have.property('title', 'Updated title');
                        res.body.should.have.property('courseNumber', 8888);
                        res.body.should.have.property('description', course.description);
                        res.body.should.have.property('professor');
                        res.body.professor._id.should.be.equal(course.professor.id.toString());
                        res.body.should.have.property('students').and.have.lengthOf(5);
                        res.body.should.have.property('questions').and.have.lengthOf(0);

                        done();

                    });


            });

            it('it should be failing to update a non-existing course', function (done){

                this.timeout(10000);

                // store the course object - we need it for sending
                var courseObject = course;

                // clear the database
                Course.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                server.put('/api/courses/' + courseObject._id.toString())
                    .send(course)
                    .expect('Content-Type', /json/)
                    .expect(500) // here, I am testing for code 500 only
                    .end(function (err, res){

                        done();
                    });

            });

        });

        describe('Testing the DELETE routes - course deletion', function () {

            it('it should be able to delete a course without any problems', function (done){

                this.timeout(10000);

                // save the ID for later use
                var courseId = course._id;

                server.del('/api/courses/' + course._id.toString()) // request route - look for routes/courses.js
                    .send(course)
                    .expect(200)
                    .end(function (err, res){
                        expect(err).to.be(null);

                        res.body.should.have.property('title', course.title);
                        res.body.should.have.property('courseNumber', course.courseNumber);
                        res.body.should.have.property('description', course.description);
                        res.body.should.have.property('professor');
                        res.body.professor._id.should.be.equal(course.professor.id.toString());
                        res.body.should.have.property('students').and.have.lengthOf(5);
                        res.body.should.have.property('questions').and.have.lengthOf(0);

                        // test if the course is still in the model
                        Course.load(courseId, function(err, course){
                            expect(course).to.be(null);
                            done();
                        });

                    });
            });

            it('it should fail when deleting a non-existing course', function (done){

                this.timeout(10000);

                // clear the database
                Course.remove({}, function(err){
                    //clearing the database
                    expect(err).to.be(null);
                });

                server.del('/api/courses/' + course._id.toString()) // request route - look for routes/courses.js
                    .send(course)
                    .expect(500)
                    .end(function (err, res){
                        done();
                    });
            });

        });

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