const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
    category: {
        type: String,
        required:true
        },
    question:{
        type: String,
        required: true,
        trim: true
    },
    answers: {
        type: [],
        required:true,
        trim: true,
        lowercase: true
    },
    correctAnswer:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    }
    },
     {
        timestamps: true
    })

const Question = model("Question", questionSchema);

module.exports = Question;