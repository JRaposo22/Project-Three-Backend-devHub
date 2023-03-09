const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/Question.model')

router.get('/quiz/:type', async (req, res, next) => {
    const {type} = req.params;

    try {

       if(type === 'general'){
       let questions = await Question.find();
       let randomNumbers = [];
       let quiz = [];
       let i = 0;
       let random = 0;

       while(i < 10){
        random = Math.floor(Math.random() * questions.length + 1);
        if(!randomNumbers.includes(random)) {
        randomNumbers.push(random);
        quiz.push(questions[random]);
        i++;

        }
    }


       }

        res.json(quiz);
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;