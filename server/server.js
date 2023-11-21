import mongoose from 'mongoose'
import express from 'express'
import Word from './model/Word.js'

const app = express()
app.use(express.json())

mongoose.connect("mongodb+srv://tmsvktr:Mongoose4321@cluster0.zrj184d.mongodb.net/")

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