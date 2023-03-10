const express = require("express");        
const router = express.Router();
const mongoose = require('mongoose');
    const Question = require('../models/Question.model')


router.get('/quiz/:type', async (req, res, next) => {
    const {type} = req.params;
    
    try {

        //Get random questions,from all types or from a specific type

        let questions;
        //Random numbers that were already used
        let randomNumbers = [];
        //Array of questions found randomly
        let quiz = [];
        let i = 0;
        //Random generated number
        let random = 0;
        //Length of questions fetched on the DB
        let questionsLength = 0;

        //Check the type of the quiz
        if(type == 'general'){
            questions = await Question.find();
         }else{
            questions = await Question.find({category:type})
       }

        //Check if there are at least 10 questions from a given type
        if(questions.length >= 10) questionsLength = 10;
        else questionsLength = questions.length;
      
        //Generate a random number, check if it was used already and push that random question do the quiz array
        while(i < questionsLength){
             random = Math.floor(Math.random() * questionsLength);
             if(!randomNumbers.includes(random)) {
                randomNumbers.push(random);
                quiz.push(questions[random]);
                i++;
               }
        }
       
        res.json(quiz);

    } catch (error) {
        console.log(error);
    }
})




module.exports = router;