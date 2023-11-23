import mongoose from 'mongoose'
const { Schema, model } = mongoose
const resultsSchema = new Schema({
    topic: String,
    numOfWrongAnswers: Number,
    numOfRightAnswers: Number,
    createdAt: Date,
    wrongAnswers: String,
    rightAnswers: String
});

export default model('Results', resultsSchema)