import mongoose from 'mongoose'
import User from './model/User.js'
import express from "express"

mongoose.connect("mongodb+srv://pdani1214:something1111@cluster0.vkt396l.mongodb.net/users")

const app = express()
app.use(express.json())

app.post('/api/users', async (req, res) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const created = Date.now()
        const user = await User.create({
            name,
            email,
            password,
            created
        })
        res.json(user)
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            if (user.password === password) {
                res.json('Success');
            } else {
                res.json('Wrong password');
            }
        } else {
            res.json('Email is not registered');
        }
    } catch (error) {
        console.error(error);
    }
});





app.listen(3000, () => console.log('Server started on port 3000'))