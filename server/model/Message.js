import mongoose from 'mongoose'
const { Schema, model } = mongoose
const messageSchema = new Schema({
    text: String,
    createdAt: Date,
})

export default model('Message', messageSchema)