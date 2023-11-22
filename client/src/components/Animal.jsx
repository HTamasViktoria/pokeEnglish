import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate } from "react-router-dom";


const Animal = (props) => {
    const [tasks, setTasks] = useState([])
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [completed, setCompleted] = useState(false)
    const [answers, setAnswers] = useState([])
    const [hungarianNames, setHungarianNames] = useState([])
    const [correctOverall, setCorrectOverall] = useState(false)
    const [topics, setTopics] = useState([])
    const navigate = useNavigate();
    const animalNames = [
        'Dog', 'Cat', 'Fish', 'Bird', 'Elephant', 'Monkey', 'Turtle',
        'Penguin', 'Koala', 'Dolphin', 'Panda', 'Lion', 'Giraffe',
        'Butterfly', 'Frog', 'Rabbit', 'Bear', 'Owl', 'Duck', 'Horse',
        'Chicken', 'Sheep', 'Cow', 'Mouse', 'Snake', 'Gorilla', 'Tiger',
        'Fox', 'Zebra', 'Pig', 'Deer', 'Elephant Seal', 'Kangaroo', 'Ostrich',
        'Pig', 'Squirrel', 'Hedgehog', 'Ladybug', 'Bee', 'Snail', 'Ant',
        'Caterpillar', 'Dragonfly', 'Spider', 'Bat', 'Cheetah', 'Jaguar',
        'Leopard', 'Hippopotamus'
    ]
   

    function getRandomElements(array, animal, n) {
        const shuffledArray = array.slice().sort(() => 0.5 - Math.random());
        const filteredArray = shuffledArray.filter(element => element !== animal);
        const randomAnimals = [animal, ...filteredArray.slice(0, n - 1)];
        const finalArray = randomAnimals.sort(() => 0.5 - Math.random());
        return finalArray;
    }

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/words/animal`);
            const data = await response.json();
            setTasks(data);
            const hungarianNamesArray = data.map((task) => task.hungarian);
            setHungarianNames(hungarianNamesArray);
        };

        fetchData();
    }, []);

    const handleAnimalClick = (clickedAnimal, correctEnglish) => {
        const isCorrect = clickedAnimal === correctEnglish;

        setAnswers((prevAnswers) => [
            ...prevAnswers,
            { clickedAnimal, correctEnglish, isCorrect },
        ]);

        setCurrentTaskIndex((prevIndex) => prevIndex + 1);

        if (currentTaskIndex + 1 >= tasks.length) {
            setAnswers((prevAnswers) => {
                const allCorrect = prevAnswers.every((answer) => answer.isCorrect);
                setCorrectOverall(allCorrect);
                setCompleted(true);
                setCurrentTaskIndex(0);
                



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

    useEffect(() => {
        if (completed) {
            const allCorrect = answers.every((answer) => answer.isCorrect);
            setCorrectOverall(allCorrect);
    
            if (allCorrect) {
                const pokemonData = { pokemon: topics[0].pokemon };
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
            setCurrentTaskIndex(0);
        }
    }, [completed, answers, topics]);

    const selectTask = () => {
        navigate(`/home/Tasks/`);
      };



    const currentTask = tasks[currentTaskIndex];
    const randomAnimals = getRandomElements(animalNames, currentTask?.english, 4);
    return (
        <>
            {completed ? (
                <>
                    <NavBar />
                    <div>
                        <h2>Results</h2>
                        {answers.map((answer, index) => (
                            <div
                                key={index}
                                className={`answer ${answer.isCorrect ? "correct" : "wrong"}`}
                            >
                                <p>
                                    {answer.clickedAnimal} = {hungarianNames[index]} -{" "}
                                    {answer.isCorrect ? "Correct!" : "Wrong!"}
                                </p>
                            </div>
                        ))}
                        {correctOverall ? (
                            <>
                            <p>Congratulations you won:</p>
                            <img src={topics[0].pokemon}/>
                            <button onClick={selectTask} >Tasks</button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleRetry}>Retry</button>
                                <button onClick={selectTask} >Tasks</button>
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
                                <div
                                    key={index}
                                    className="animal"
                                    onClick={() => handleAnimalClick(animal, currentTask?.english)}
                                >
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

export default Animal;