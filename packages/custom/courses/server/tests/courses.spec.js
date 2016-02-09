/**
 * Created by lewkoo on 2016-01-27.
 */
'use strict';

/**
 * Model module dependencies.
 */

var expect = require('expect.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Course = mongoose.model('Course');

/**
 * Controller module dependencies.
 */
var coursesController = require('Courses');


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
                this.timeout(10000)
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

            it('it should be throwing an error when you try to save a cource without a professor', function (done) {
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
            });

            course_2.remove(function () {
                professor.remove();
                students.forEach(function (entry) {
                    entry.remove();
                });
            });

            done();
        });

    }); // END of Course model tests

    describe('Controller Course:', function() {
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

            // ave that course in the testing DB
            course.save();

            done();
        });


        afterEach(function (done) {
            this.timeout(10000);
            course.remove(function () {
                professor.remove();
                students.forEach(function (entry) {
                    entry.remove();
                });
            });
            done();
        });

    }); // END of Course controller tests

});// END of description of Unit Test Suite;