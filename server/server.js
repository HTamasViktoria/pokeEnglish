import mongoose from 'mongoose'
import express from 'express'
import Word from './model/Word.js'
import User from './model/User.js'


mongoose.connect("mongodb+srv://pdani1214:something1111@cluster0.vkt396l.mongodb.net/users")

const app = express()
app.use(express.json())




app.post('/api/addnew', (req, res) => {
    console.log("kérés érkezett")
    Word.create({
        english: req.body.english,
        hungarian: req.body.hungarian,
        topic: req.body.topic,
        createdAt: req.body.date,
    })
        .then(word => {
            console.log(word);
            res.send(word)
        })
})

app.listen(3000, () => console.log("Server is listening on port 3000"))
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







