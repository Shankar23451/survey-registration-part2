/*--
Author: Sage Groupe
Date: 12-11-2020
FileName : app.js

Routing for Contact list
*/



let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//let jwt = require('jsonwebtoken');

let passport = require('passport');



let userController = require('../controllers/user');


/* GET Route show the login page*/
router.get('/login', userController.displayLoginPage);

/* POST Route show the login page*/
router.post('/login', userController.processLoginPage);


/* GET Route show the register page */
router.get('/register', userController.displayRegisterPage);

/* POST  register page */
router.post('/register', userController.processRegisterPage);
router.get('/logout',userController.performLogout)

module.exports = router;