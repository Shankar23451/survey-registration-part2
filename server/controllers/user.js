/*--
Author: Sage Groupe
Date: 12-11-2020
FileName : app.js
*/


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//let jwt = require('jsonwebtoken');

// create a reference to the model
let userModel = require('../models/user');
let User = userModel.User;


module.exports.displayLoginPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('user-login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName: ''
        });
    }
    else
    {
        res.redirect('/');
    }
}

module.exports.displayRegisterPage = (req, res, next) => {
    
    if(!req.user)
    {
        res.render('user-register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        //if the user already exists
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.displayname);

    let newUser = User({
        "username": req.body.username,
        "email": req.body.email,
        "displayname": req.body.displayname
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('user-register', {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayname : ''
            });
        }
        else
        {
           return passport.authenticate('local')(req, res, () => {
               res.redirect('/survey-list');
           });
        }
    });



}


module.exports.processLoginPage = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.username);
    console.log(req.body.password);

    passport.authenticate('local', 
    (err, user, info) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        //is there a user login error?
        if(!user)
        {
            console.log(user);
            console.log(err);
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/user/login');
        }
        req.login(user, (err) => {
            //server err?
            if(err)
            {
                return next(err);
            }

            res.redirect('/survey-list');
        });
    })(req, res, next);

}


module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
