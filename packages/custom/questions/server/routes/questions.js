'use strict';


// Question authorization helper for profs
var hasAuthorization = function(req, res, next) {
    if (!req.question.user._id.equals(req.user._id)) {
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

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Questions, app, auth) {

var questions = require('../controllers/questions')(Questions);


    //app.get('/api/questions/example/anyone', function(req, res, next) {
  //  res.send('Anyone can access this');
  //});
  //
  //app.get('/api/questions/example/auth', auth.requiresLogin, function(req, res, next) {
  //  res.send('Only authenticated users can access this');
  //});
  //
  //app.get('/api/questions/example/admin', auth.requiresAdmin, function(req, res, next) {
  //  res.send('Only users with Admin role can access this');
  //});
  //
  //app.get('/api/questions/example/render', function(req, res, next) {
  //  Questions.render('index', {
  //    package: 'questions'
  //  }, function(err, html) {
  //    //Rendering a view from the Package server/views
  //    res.send(html);
  //  });
  //});


    app.route('/api/questions')
        .get(questions.all, auth.requiresLogin)
        .post(auth.requiresLogin, hasPermissions, questions.create);
    app.route('/api/questions/:questionsId')
        .get(auth.isMongoId, auth.requiresLogin, questions.show)
        .put(auth.isMongoId, auth.requiresLogin, auth.requiresProf, hasAuthorization, hasPermissions, questions.update)
        .delete(auth.isMongoId, auth.requiresLogin, auth.requiresProf, hasAuthorization, hasPermissions, questions.destroy);

// Finish with setting up the articleId param
    app.param('questionId', questions.question);
};
