/**
 * Created by lewkoo on 2016-01-24.
 */
'use strict';

/**
 * Module dependencies.
 */
var path = require('path');

var expect = require('expect.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    //UserTestHelper = require (path.join(__dirname,'user.speck'));
    UserTestHelper = require( './users.spec.js' );

/**
 * Globals
 */
var professor;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
    describe('Professor role:', function() {

        before(function(done) {
            professor = {
                name: 'Full name',
                email: 'test' + UserTestHelper.getRandomString() + '@test.com',
                username: UserTestHelper.getRandomString(),
                password: 'password',
                provider: 'local',
                roles: 'professor'
            };
            done();
        });

        /**
         * Professor user tests go in here
         */


        /**
         * Testing Save method
         *
         */
        describe('Method Save', function() {

            it('should begin without the test user', function(done) {
                User.find({
                    email: professor.email
                }, function(err, users) {
                    expect(users.length).to.equal(0);
                    done();
                });
            });

            it('should be able to save a professor without problems', function(done) {
                var _user = new User(professor);
                _user.save(function(err) {
                    expect(err).to.be(null);
                    _user.remove();
                    done();
                });
            });

            it('should check that professor roles are assigned and created properly', function(done) {
                var _user = new User(professor);
                _user.save(function(err) {
                    expect(err).to.be(null);

                    // so, the professor object should has the correct roles
                    expect(_user.hasRole('authenticated')).to.equal(false);
                    expect(_user.hasRole('admin')).to.equal(false);
                    expect(_user.isAdmin()).to.equal(false);

                    expect(_user.roles.length).to.equal(1);
                    expect(_user.hasRole('professor')).to.equal(true);

                    // the professor object should respond positively to
                    // isProfessor
                    expect(_user.isProfessor()).to.equal(true);

                    _user.remove(function(err) {
                        done();
                    });
                });
            });

            it('should check that professor status changes if the role is updated', function(done) {
                var _user = new User(professor);
                _user.save(function(err) {
                    expect(err).to.be(null);

                    _user.roles = ['authenticated'];

                    // so, the professor object should has the correct roles
                    expect(_user.hasRole('authenticated')).to.equal(true);
                    expect(_user.hasRole('admin')).to.equal(false);
                    expect(_user.isAdmin()).to.equal(false);

                    expect(_user.roles.length).to.equal(1);
                    expect(_user.hasRole('professor')).to.equal(false);

                    // the professor object should now respond negatively to
                    // isProfessor
                    expect(_user.isProfessor()).to.equal(false);

                    _user.remove(function(err) {
                        done();
                    });
                });
            });

        }); // Method Save description end

    });
});