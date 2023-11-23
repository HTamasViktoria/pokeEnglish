import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";


const Quiz = () => {
    const [tasks, setTasks] = useState([])
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [completed, setCompleted] = useState(false)
    const [answers, setAnswers] = useState([])
    const [hungarianNames, setHungarianNames] = useState([])
    const [correctOverall, setCorrectOverall] = useState(false)
    const [topics, setTopics] = useState([])
    const navigate = useNavigate();
    const { selectedTopic } = useParams()
    let reward = null
    

    const easyWords = [
        "apple", "banana", "cat", "dog", "elephant", "frog", "goat", "hat", "igloo", "jelly",
        "kite", "lion", "moon", "nest", "orange", "penguin", "queen", "rainbow", "sun", "turtle",
        "umbrella", "van", "watermelon", "xylophone", "yellow", "zebra", "ant", "bird", "cake", "duck",
        "egg", "fish", "grape", "house", "ice cream", "juice", "key", "lemon", "mango", "notebook",
        "owl", "puzzle", "quilt", "robot", "star", "train", "unicorn", "volcano", "windmill", "xylophone",
        "yogurt", "zipper", "bear", "carrot", "dinosaur", "dragon", "flower", "guitar", "hammer", "island",
        "jigsaw", "kangaroo", "lamp", "mailbox", "noodle", "octopus", "piano", "quack", "rocket", "snail",
        "tiger", "umbrella", "vase", "whale", "xylograph", "yo-yo", "zeppelin", "astronaut", "butterfly",
        "caterpillar", "dolphin", "envelope", "firefly", "garden", "hamburger", "iceberg", "jungle", "koala",
        "lighthouse", "muffin", "nightingale", "ocean", "parrot", "quilt", "raindrop", "squirrel", "telescope",
        "unicorn", "vampire", "waffle", "xylograph", "yarn", "zeppelin", "alligator", "balloon", "cupcake",
        "daisy", "eagle", "feather", "giraffe", "honey", "island", "jellyfish", "kiwi", "leopard", "marshmallow",
        "necklace", "olive", "penguin", "quilt", "rainbow", "sandcastle", "teapot", "umbrella", "vase", "whale",
        "xylophone", "yo-yo", "zebra", "apple", "banana", "cat", "dog", "elephant", "frog", "goat", "hat", "igloo",
        "jelly", "kite", "lion", "moon", "nest", "orange", "penguin", "queen", "rainbow", "sun", "turtle", "umbrella",
        "van", "watermelon", "xylophone", "yellow", "zebra", "ant", "bird", "cake", "duck", "egg", "fish", "grape",
        "house", "ice cream", "juice", "key", "lemon", "mango", "notebook", "owl", "puzzle", "quilt", "robot", "star",
        "train", "unicorn", "volcano", "windmill", "xylophone", "yogurt", "zipper", "bear", "carrot", "dinosaur", "dragon",
        "flower", "guitar", "hammer", "island", "jigsaw", "kangaroo", "lamp", "mailbox", "noodle", "octopus", "piano",
        "quack", "rocket", "snail", "tiger", "umbrella", "vase", "whale", "xylograph", "yo-yo", "zeppelin", "astronaut",
        "butterfly", "caterpillar", "dolphin", "envelope", "firefly", "garden", "hamburger", "iceberg", "jungle", "koala",
        "lighthouse", "muffin", "nightingale", "ocean", "parrot", "quilt", "raindrop", "squirrel", "telescope", "unicorn",
        "vampire", "waffle", "xylograph", "yarn", "zeppelin", "alligator", "balloon", "cupcake", "daisy", "eagle", "feather",
        "giraffe", "honey", "island", "jellyfish", "kiwi", "leopard", "marshmallow", "necklace", "olive", "penguin", "quilt",
        "rainbow", "sandcastle", "teapot", "umbrella", "vase", "whale", "xylophone", "yo-yo", "zebra"
    ]
   

    const getRandomElements = (array, animal, n) => {
        const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
        const filteredArray = shuffledArray.filter(element => element !== animal);
        const randomAnimals = [animal, ...filteredArray.slice(0, n - 1)];
        const finalArray = randomAnimals.sort(() => 0.5 - Math.random());
        return finalArray;
    }

    useEffect(() => {
        const fetchWords = async () => {
            const response = await fetch(`/api/words/${selectedTopic}`);
            const data = await response.json();
            setTasks(data);
            const hungarianNamesArray = data.map((task) => task.hungarian);
            setHungarianNames(hungarianNamesArray);
        };
    
        fetchWords();
    }, []);

    const handleClick = (clicked, correctEnglish) => {
        //Check if the clicked animal is the correct one
        const isCorrect = clicked === correctEnglish;
    
        //Update the answers state with the new answer
        setAnswers((prevAnswers) => [
            ...prevAnswers,
            { clicked, correctEnglish, isCorrect },
        ]);
    
        //Move to the next task by updating the currentTaskIndex
        setCurrentTaskIndex((prevIndex) => prevIndex + 1);
    
        // Check if all tasks are completed
        if (currentTaskIndex + 1 >= tasks.length) {
            // Check if all answers are correct
            setAnswers((prevAnswers) => {
                const allCorrect = prevAnswers.every((answer) => answer.isCorrect);
                setCorrectOverall(allCorrect);
                setCompleted(true);
                setCurrentTaskIndex(0); // Reset the task index for the next quiz
                return prevAnswers;
            });
        }
    };

    const handleRetry = () => {
        setAnswers([]);
        setCompleted(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/topics')
            const data = await response.json()
            setTopics(data)
        }
        fetchData()
    }, [])

    for(const topic of topics) {
        if(topic.name === selectedTopic) {
            reward = topic
        }
    }

    useEffect(() => {
        if (completed) {
            const allCorrect = answers.every((answer) => answer.isCorrect);
            setCorrectOverall(allCorrect);
            if (allCorrect) {
                const pokemonData = { name: reward.name, pokemon: reward.url };
                fetch('/api/inventory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(pokemonData),
                })
                .then((response) => response.json())
                .then((data) => {
                    console.log('POST request successful', data);
                })
                .catch((error) => {
                    console.error('Error making POST request', error);
                });
            }
    
            setCompleted(true);
        }
    }, [completed, answers, topics]);

    const selectTask = () => {
        navigate(`/home`);
    };

    const currentTask = tasks[currentTaskIndex];
    const randomAnimals = getRandomElements(easyWords, currentTask?.english, 4);
    return (
        <>
            {completed ? (
                <>
                    <NavBar />
                    <div >
                        <h2 className="rslt" >Results</h2>
                        {answers.map((answer, index) => (
                            <div key={index} className={`answer ${answer.isCorrect ? "correct" : "wrong"}`}>
                                <p>
                                    {answer.clicked} = {hungarianNames[index]} -{" "}
                                    {answer.isCorrect ? "Correct!" : "Wrong!"}
                                </p>
                            </div>
                        ))}
                        {correctOverall ? (
                            <>
                                <p className="rslt" >Congratulations you won:</p>
                                <img className="rsltp" src={reward.url}/>
                                <button onClick={selectTask} className="rsltb" id="btn" >Tasks</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleRetry} className="rsltc" id="btn"  >Retry</button>
                                <button onClick={selectTask} className="rsltc" id="btn"  >Tasks</button>
                            </>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <NavBar />
                    <div className="task">
                        <h2 className="hungarian">{currentTask?.hungarian}</h2>
                        <div className="animals-container">
                            {randomAnimals.map((animal, index) => (
                                <div key={index} className="animal" onClick={() => handleClick(animal, currentTask?.english)}>
                                    <p>{animal}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Quiz;