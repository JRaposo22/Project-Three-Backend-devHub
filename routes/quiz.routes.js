const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../models/Question.model')

router.get('/quiz/:type', async (req, res, next) => {
    const {type} = req.params;

    try {
       const questions = Question.aggregate(
            [ { $sample: { size: 10 } } ]
         )
        res.json(questions);
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;