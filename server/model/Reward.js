import mongoose from 'mongoose'
const { Schema, model } = mongoose
const rewardSchema = new Schema({
    text: String,
    points: Number,
    claimed: {
        type: Boolean,
        default: false,
    },
    createdAt: Date,
})

export default model('Reward', rewardSchema)