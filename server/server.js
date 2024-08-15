import mongoose from 'mongoose'
import express from 'express'
import Word from './model/Word.js'
import User from './model/User.js'
import Topic from './model/Topic.js'
import Inventory from './model/Inventory.js'
import Message from './model/Message.js'
import Reward from './model/Reward.js'
import Result from './model/Result.js'
import Images from './model/Images.js'


mongoose.connect("mongodb+srv://<username>:<password>@<cluster-url>/<database-name>")



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

app.post('/api/addNewTopic', async (req, res) => {//api/topics
    const body = req.body
    try {
        const existing = await Topic.findOne({ name: req.body.name });

        if (existing) {
            console.log("Topic already existing")
            return res.json({ error: "Existing topic name" });
        }

        const newTopic = await Topic.create({
            name: req.body.name,
            url: {
                default: req.body.url.default,
                shiny: req.body.url.shiny
            },
            createdAt: req.body.createdAt,
        });

        const imageToUpdate = await Images.findOne({ name: req.body.url.default });

        if (imageToUpdate) {
            imageToUpdate.occupied = true;
            await imageToUpdate.save();
        }

        console.log("Topic added successfully:", newTopic);
        res.json(newTopic);
    } catch (error) {
        console.error("Error adding topic:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get('/api/images', async (req, res) => {
    try {
        const images = await Images.find({ occupied: false })
        res.json(images)
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/topics', async (req, res) => {
    try {
        const topic = await Topic.find()
        console.log(`topics: ${topic}`)
        res.json(topic)
    } catch (error) {
        console.error(error)
    }
})

app.get('/api/words/:topic', (req, res) => {
    console.log("kérés érkezett")
    console.log(req.params.topic)
    const topic = req.params.topic;

    Word.find({ topic: topic })
        .then(words => {
            res.send(words);
            console.log(words)
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

app.put('/api/word/:id', (req, res) => {
    const id = req.params.id;

    Word.findById(id)
        .then(word => {
            if (!word) {
                return res.status(404).json({ error: 'Word not found' });
            }

            word.english = req.body.modifiedEnglish;
            word.hungarian = req.body.modifiedHungarian;

            return word.save();
        })
        .then(updatedWord => {
            res.json(updatedWord);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.delete('/api/word/:id', async (req, res) => {
    const id = req.params.id
    try {
        const deleteWord = await Word.findByIdAndDelete(id)
        res.json(deleteWord)
    } catch (err) {
        console.error(err)
    }
})

app.post('/api/message', (req, res) => {
    Message.create({
        text: req.body.text,
        user: req.body.user,
        createdAt: req.body.createdAt,
    })
        .then(message => res.send(message))
        .catch(error => console.error(error))
})

app.get('/api/messages', (req, res) => {
    Message.find()
        .then(messages => res.send(messages))
        .catch(error => console.error(error))
})

app.delete('/api/message/:id', async (req, res) => {
    const messageId = req.params.id;
    try {
        const deletedMessage = await Message.findByIdAndDelete(messageId);
        res.send({ message: 'Message deleted successfully' });
        console.log(deletedMessage);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

app.post('/api/reward', (req, res) => {
    Reward.create({
        text: req.body.text,
        points: req.body.points,
        createdAt: req.body.createdAt,
    })
        .then(reward => res.send(reward))
        .catch(error => console.error(error))
})

app.patch('/api/reward/:id', async (req, res) => {
    const id = req.params.id
    const updates = req.body
    try {
        const reward = await Reward.findByIdAndUpdate(id, updates, { new: true })
        res.json(reward)
    } catch (err) {
        console.error(err)
    }
})

app.get('/api/rewards', (req, res) => {

    Reward.find()
        .then(reward => res.send(reward))
        .catch(error => console.error(error))
})

app.get('/api/results', (req, res) => {
    Result.find()
        .sort({ createdAt: 1 })
        .then(results => {
            console.log(results);
            res.send(results);
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
});


app.post('/api/results', (req, res) => {

    Result.create({
        topic: req.body.topic,
        numOfWrongAnswers: req.body.numOfWrongAnswers,
        numOfRightAnswers: req.body.numOfRightAnswers,
        createdAt: req.body.createdAt,
        wrongAnswers: req.body.wrongAnswers,
        rightAnswers: req.body.rightAnswers,
        percentage: req.body.percentage
    })
        .then(results => res.send(results))
        .catch(error => console.error(error))
})

app.get('/api/words', async (req, res) => {
    try {
        const word = await Word.find()
        res.json(word)
    } catch (error) {
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
    } catch (error) {
        console.error(error)
    }
})

app.post('/api/inventory', async (req, res) => {
    try {
        console.log(req.body);
        const name = req.body.name
        const pokemon = req.body.pokemon
        const bothCompleted = req.body.bothCompleted
        const created = Date.now()
        const item = new Inventory({
            name,
            pokemon,
            bothCompleted,
            created
        })
        await item.save()
        res.json(item)

    } catch (error) {
        console.error(error)
    }
})

app.patch('/api/inventory/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = req.body;

        const item = await Inventory.findByIdAndUpdate(itemId, updates, { new: true });

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        console.eerror(err)
    }
})

app.patch('/api/users/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const updates = req.body;

        const item = await User.findByIdAndUpdate(itemId, updates, { new: true });

        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


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






