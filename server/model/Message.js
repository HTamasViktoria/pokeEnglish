import mongoose from 'mongoose'
const { Schema, model } = mongoose
const messageSchema = new Schema({
    text: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    },
    createdAt: Date,
})

export default model('Message', messageSchema)