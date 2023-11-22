import mongoose from 'mongoose'
const { Schema, model } = mongoose
const inventorySchema = new Schema({
    pokemon: String,
    createdAt: Date
})

export default model('Inventory', inventorySchema)