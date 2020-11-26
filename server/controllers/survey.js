/*--
Author: Sage Groupe
Date: 12-11-2020
FileName : app.js
*/


let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//let jwt = require('jsonwebtoken');

// create a reference to the model
let Survey = require('../models/survey');

module.exports.displaySurveyList = (req, res, next) => {
    Survey.find((err, surveyList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            console.log(surveyList);
            console.log("inside /servey-list");
            if(req.user){
                console.log(req.user ? req.user.displayname : '');
            } else{
                console.log("no displayname passed here");
            }
            

            res.render('survey-list', 
            {title: 'Survey List', 
            SurveyList: surveyList, 
            displayName: req.user ? req.user.displayname : ''});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('survey-add', {title: 'Add Survey', 
    displayName: req.user ? req.user.displayname : ''})          
}

module.exports.processAddPage = (req, res, next) => {
    console.log('recieved the request....');
    console.log(req.body.title);
    console.log(req.body.subtitle);

    let newSurvey = Survey({
        "title": req.body.title,
        "subtitle": req.body.subtitle,
        "description": req.body.description,
        "enterQuestion1": req.body.enterQuestion1,
        "enterQuestion2": req.body.enterQuestion2,
        "enterQuestion3": req.body.enterQuestion3
    });

    Survey.create(newSurvey, (err, Survey) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the list
            res.redirect('/survey-list');
        }
    });

}

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            //TODO need to check res.render('survey-edit', {title: 'Edit Survey', business: businessToEdit, 
            //displayName: req.user ? req.user.displayName : ''})
            res.render('survey-edit', {title: 'Edit Survey', survey: surveyToEdit, 
            displayName: req.user ? req.user.displayname : ''})
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id

    let updatedSurvey = Survey({
        "_id": id,
        "title": req.body.title,
        "subtitle": req.body.subtitle,
        "description": req.body.description,
        "enterQuestion1": req.body.enterQuestion1,
        "enterQuestion2": req.body.enterQuestion2,
        "enterQuestion3": req.body.enterQuestion3
    });

    Survey.updateOne({_id: id}, updatedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the business list
            res.redirect('/survey-list');
        }
    });
}

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the business list

             res.redirect('/survey-list');
        }
    });
}

module.exports.displaySurveyContactList = (req, res, next) => {
    Contact.find((err, SurveyContactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BusinessContactList);

            res.render('survey-list', 
            {title: 'Survey List', 
            SurveyList: SurveyContactList, 
            displayName: req.user ? req.user.displayname : ''});      
        }
    }).sort({"firstName":1}); // contact list alphabetically sorted 
}
