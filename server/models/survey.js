let mongoose = require ('mongoose');

//create a model class
let surveyModel = mongoose.Schema({
title: String,
subtitle: String,
description: String,
enterQuestion1: String,
enterQuestion2: String,
enterQuestion3: String
},
{
    collection: "survey"
}) ;

module.exports = mongoose.model('Survey',surveyModel);