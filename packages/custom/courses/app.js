'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Courses = new Module('courses');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Courses.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Courses.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Courses.menus.add({
    title: 'your courses',
    link: 'your courses',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Courses.aggregateAsset('css', 'courses.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Courses.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Courses.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Courses.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Courses;
});
