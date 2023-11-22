import mongoose from 'mongoose'
const { Schema, model } = mongoose
const topicSchema = new Schema({
    topic: String,
    url: String,
    createdAt: Date
})

export default model('Topic', topicSchema)