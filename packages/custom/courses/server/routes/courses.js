'use strict';

module.exports = function(Courses, app, auth, database) {

  var courses = require('../controllers/courses')(Courses);

  app.route('/api/courses')
      .get(courses.all)
      .post(courses.create);
  app.route('/api/courses/:courseId')
      .get(courses.show)
      .put(courses.update)
      .delete(courses.destroy);

  // Finish with setting up the courseId param
  app.param('courseId', courses.course);
};
