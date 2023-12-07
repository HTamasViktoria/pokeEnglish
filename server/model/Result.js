import mongoose from 'mongoose'
const { Schema, model } = mongoose

const resultSchema = new Schema({
    topic: String,
    numOfWrongAnswers: Number,
    numOfRightAnswers: Number,
    createdAt: Date,
    wrongAnswers: String,
    rightAnswers: String,
    percentage: Number,
});

export default model('Result', resultSchema)