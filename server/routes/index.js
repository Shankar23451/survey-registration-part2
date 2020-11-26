var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Welcome survey' });
});








// /* GET Surevey page. */
router.get('/home', function(req, res, next) {
 res.render('survey-list', { title: 'Current Survey List' });
});

// /* GET Surevey page. */
router.get('/survey', function(req, res, next) {
 res.render('survey', { title: 'Survey' });
});

// // /* GET Route for displaying the Login page */
// router.get('/login', indexController.displayLoginPage);

// // /* POST Route for processing the Login page */
// router.post('/login', indexController.processLoginPage);

// // /* GET Route for displaying the Register page */
// router.get('/register', indexController.displayRegisterPage);

// // /* POST Route for processing the Register page */
// router.post('/register', indexController.processRegisterPage);

// // /* GET to perform UserLogout */
// router.get('/logout', indexController.performLogout);

module.exports = router;
