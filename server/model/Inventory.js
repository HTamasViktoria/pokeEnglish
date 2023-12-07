import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const inventorySchema = new Schema({
    name: String,
    pokemon: {
        default: String,
        shiny: String
    },
    bothCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default model('Inventory', inventorySchema);