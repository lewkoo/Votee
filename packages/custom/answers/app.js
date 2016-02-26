'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Answers = new Module('answers');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Answers.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Answers.routes(app, auth, database);

  Answers.events.defaultData({
    type: 'post',
    subtype: 'answer'
  });

  //We are adding a link to the main menu for all authenticated users
  return Answers;
});
