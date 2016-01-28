/**
 * Created by lewkoo on 2016-01-27.
 */
'use strict';

/**
 * Module dependencies.
 */

var expect = require('expect.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Course = mongoose.model('Course');

/**
 * Globals
 */
var professor;
var students = [];
var course;

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

describe('<Unit Test>', function() {
    describe('Model Course:', function() {
        beforeEach(function(done){
            this.timeout(10000);

            professor = new User({
                name: 'Some professor',
                email: 'prof@university.ca',
                username: 'number1Prof1972',
                password: 'youshallnotpass'
            });
            professor.save();

            for (var i = 0; i < 5; i++){
                var student = generateRandomStudent(i);
                student.save();
                students.push(student);
            } // generate 5 students


            course = new Course({
               title: 'Test Course',
               description: 'This is a test',
               professor: professor,
               students: students
            });
            done();
        }); // END of beforeEach

        describe('Method Save', function(){

            it('it should be able to save a course without problems', function(done){
                this.timeout(10000);

                return course.save(function(err, data){
                    expect(err).to.be(null);
                    expect(data.title).to.equal('Test Course');
                    expect(data.description).to.equal('This is a test');
                    expect(data.professor.length).to.not.equal(0);
                    expect(data.students.length).to.equal(5);
                    expect(data.created.length).to.not.equal(0);
                    done();
                });
            });

        }); // END of Save method tests


    }); // END of Course model tests
});// END of description of Unit Test Suite