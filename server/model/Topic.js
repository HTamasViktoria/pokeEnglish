import mongoose from 'mongoose'
const { Schema, model } = mongoose
const topicSchema = new Schema({
    name: String,
    url: {
        default: String,
        shiny: String
    },
    createdAt: Date
})

export default model('Topic', topicSchema)