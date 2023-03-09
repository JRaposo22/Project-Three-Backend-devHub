const mongoose = require('mongoose');
require('dotenv').config();
const axios = require("axios");
const Question = require('../models/Question.model')

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/IronHack-devHub";

async function questionsSeed() {


    const response = await  axios.get('https://quizapi.io/api/v1/questions', {headers:{'X-Api-Key': 'kiphx7BM61aA1fTimYBuQ1g6sK3Ab3Fk5w9FwmV3'},params:{'tags':'JavaScript'}});
    console.log(response.data)
    
    let questionsDB =[];
    const questions = response.data;
    questions.forEach(quest => {
        let question = quest.question;
        let answers = {
            answer_a : quest.answers.answer_a,
            answer_b : quest.answers.answer_b,
            answer_c : quest.answers.answer_c,
            answer_d : quest.answers.answer_d,
        };
        let category = 'JavaScript';
        let correctAnswer = '';
        if(quest.correct_answers.answer_a_correct === 'true')  correctAnswer = quest.answers.answer_a;
        else if(quest.correct_answers.answer_b_correct === 'true')  correctAnswer = quest.answers.answer_b;
        else if(quest.correct_answers.answer_c_correct === 'true')  correctAnswer = quest.answers.answer_c;
        else if(quest.correct_answers.answer_d_correct === 'true')  correctAnswer = quest.answers.answer_d;

        console.log('DB QUESTION',question, answers, category,'resposta certa', correctAnswer)

        let newQuestion = {
            question: question,
            answers: answers,
            category: category,
            correctAnswer: correctAnswer
        }
        
        questionsDB.push(newQuestion);
        
        
    });

    await mongoose.connect(MONGO_URI);
    await Question.create(questionsDB);
    mongoose.connection.close();


    /* await mongoose.connect(MONGO_URI);
    await Question.create();

    mongoose.connection.close(); */

}

questionsSeed();