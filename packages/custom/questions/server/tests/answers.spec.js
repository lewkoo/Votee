/**
 * Created by lewkoo on 2016-01-29.
 */
'use strict';

var expect = require('expect.js'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Answer = mongoose.model('Answer'),
    Question = mongoose.model('Question'),
    mean = require('meanio'),
    server = request.agent('http://localhost:' + mean.config.clean.http.port);

/**
 * Globals
 */

var professor;
var question;
var answer;
var voter1;

/**
 * Test Suites
 */

describe('<Unit Test>', function() {
    describe('Model Answer:', function() {
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
                answer: 'Option3'
            });
            question.save();

            voter1 = {
                name: 'Full name',
                email: 'test' + getRandomString() + '@test.com',
                username: getRandomString(),
                password: 'password',
                provider: 'local'
            };

            answer = new Answer({

            });

            done();
        }); // END of beforeEach




        afterEach(function(done) {
            this.timeout(10000);
            professor.remove();
            question.remove();
            done();
        });

    }); // END of Course model tests
}); // END of description of Unit Test Suite
