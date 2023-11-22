import mongoose from 'mongoose'
import express from 'express'
import Word from './model/Word.js'
import User from './model/User.js'
import Topic from './model/Topic.js'
import Inventory from './model/Inventory.js'
import Message from './model/Message.js'
import Reward from './model/Reward.js'


mongoose.connect("mongodb+srv://pdani1214:something1111@cluster0.vkt396l.mongodb.net/users")
//mongoose.connect("mongodb+srv://tmsvktr:Mongoose4321@cluster0.zrj184d.mongodb.net/")

const app = express()
app.use(express.json())


app.post('/api/addnew', async (req, res) => {
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

app.post('/api/addNewTopic', (req, res) => {
    Topic.create({
        name: req.body.name,
        url: req.body.url,
        createdAt: req.body.createdAt,
    })
        .then(topic => console.log(topic))
})

app.get('/api/topics', async (req, res) => {
    try {
        const topic = await Topic.find()
        res.json(topic)
    } catch(error) {
        console.error(error)
    }
})

app.get('/api/words/:topic', (req, res) => {
    const topic = req.params.topic;

    Word.find({ topic: topic })
        .then(words => {
            res.send(words);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.put('/api/word/:id', (req, res) => {
    const id = req.params.id
    Word.findById(id)
        .then(word => {
            word.english = req.body.modifiedEnglish;
            word.hungarian = req.body.modifiedHungarian
            word.save()
                .then(word => res.send(word))
                .catch(error => console.error(error))
        })

})

app.post('/api/message', (req, res) => {
    Message.create({
        text: req.body.text,
        createdAt: req.body.createdAt,
    })
        .then(message => res.send(message))
        .catch(error => console.error(error))
})

app.get('/api/messages', (req, res) => {
    console.log("kérés érkezett")
    Message.find()
        .then(messages => res.send(messages))
        .catch(error => console.error(error))
})

app.post('/api/reward', (req, res) => {
    Reward.create({
        text: req.body.text,
        createdAt: req.body.createdAt,
    })
        .then(reward => res.send(reward))
        .catch(error => console.error(error))
})

app.get('/api/rewards', (req, res) => {
    console.log("kérés érkezett")
    Reward.find()
        .then(reward => res.send(reward))
        .catch(error => console.error(error))
})

app.get('/api/words', async (req, res) => {
    try {
        const word = await Word.find()
        res.json(word)
    } catch(error) {
        console.error(error)
    }
})

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

app.get('/api/inventory', async (req, res) => {
    try {
        const inventory = await Inventory.find()
        res.json(inventory)
    } catch(error) {
        console.error(error)
    }
})

app.post('/api/inventory', async (req, res) => {
    try{
        console.log(req.body);
        const pokemon = req.body.pokemon
        const created = Date.now()
        const item = new Inventory({
            pokemon,
            created
        })
        await item.save()
        res.json(item)

    } catch(error) {
        console.error(error)
    }
})


async function createWord() {
    try {
        const word = await Word.create({
            english: 'rida a bike',
            hungarian: 'biciklizni',
            topic: 'sport',
            createdAt: Date.now()
    });
    console.log(word);
    } catch (error) {
        console.error(error);
    }
}

async function createTopic() {
    try {
        const topic = await Topic.create({
            topic: 'sport',
            pokemon: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            createdAt: Date.now()
    });
    console.log(topic);
    } catch (error) {
        console.error(error);
    }
}

//createWord()
//createTopic()

app.listen(3000, () => console.log("Server is listening on port 3000"))






