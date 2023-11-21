import mongoose from 'mongoose'
const { Schema, model } = mongoose
const wordSchema = new Schema({
    english: String,
    hungarian: String,
    topic: String,
    createdAt: Date,
})

export default model('Word', wordSchema)