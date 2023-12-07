import mongoose from 'mongoose'
const { Schema, model } = mongoose
const imageSchema = new Schema({
    name: String,
    occupied: Boolean,
})

export default model('Image', imageSchema)