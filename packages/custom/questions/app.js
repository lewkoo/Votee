'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Questions = new Module('questions');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Questions.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Questions.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Questions.menus.add({
    title: 'questions example page',
    link: 'questions example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Questions.aggregateAsset('css', 'questions.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Questions.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Questions.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Questions.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Questions;
});
