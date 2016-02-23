'use strict';

// Course authorization helper for profs
// TODO: This code is repeated many times. Consider refactoring
var hasAuthorization = function(req, res, next) {
    if (!req.course.user._id.equals(req.user._id)) {
        return res.status(401).send('User is not authorized');
    }
    next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
        var permission = req.body.permissions[i];
        if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }
    next();
};

module.exports = function(Courses, app, auth, database) {

  var courses = require('../controllers/courses')(Courses);

  app.route('/api/courses')
      .get(courses.all)
      .post(courses.create);
  app.route('/api/courses/:courseId')
      .get(courses.show)
      //.put(auth.isMongoId, auth.requiresLogin, auth.requiresProf, hasAuthorization, hasPermissions, courses.update)
      //.delete(auth.isMongoId, auth.requiresLogin, auth.requiresProf, hasAuthorization, hasPermissions, courses.destroy);

  // Finish with setting up the articleId param
  app.param('courseId', courses.course);
};
