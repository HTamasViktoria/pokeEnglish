import mongoose from 'mongoose'
const { Schema, model } = mongoose

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    created: Date
})

export default model('User', userSchema)