import mongoose from 'mongoose'
const { Schema, model } = mongoose
const rewardSchema = new Schema({
    text: String,
    createdAt: Date,
})

export default model('Reward', rewardSchema)