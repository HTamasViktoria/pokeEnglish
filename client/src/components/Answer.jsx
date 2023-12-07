import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Word from './Word'
import Topic from "../../../server/model/Topic";



const Answear = (props) => {
    const navigate = useNavigate();
    const { selectedTopic } = useParams()
    const [words, setWords] = useState([])
    const [actualWord, setActualWord] = useState({})
    const [numOfTrueAnswers, setNumOfTrueAnswers] = useState(0)
    const [numOfFalseAnswers, setNumOfFalseAnswers] = useState(0)
    const [trueAnswers, setTrueAnswers] = useState([])
    const [falseAnswers, setFalseAnswers] = useState([])
    const [inventory, setInventory] = useState([])
    const [reward, setReward] = useState(null)
    const [user, setUser] = useState()



    useEffect(() => {
        fetch(`/api/words/${selectedTopic}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                setWords(data);

                setActualWord(data[0])
            })

            .catch(error => {
                console.error('Error fetching data:', error);

            });
    }, []);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('/api/inventory');
                const data = await response.json();
                setInventory(data);
            } catch (err) {
                console.error(err);
            }
        };
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/users`);
                const data = await response.json();
                setUser(data.find((item) => item._id === props.user._id));
            } catch(err) {
                console.error(err)
            }
        }
        fetchUsers()
    
        fetchInventory();
    }, []);
    
    useEffect(() => {
        const filtered = inventory.find((inv) => inv.name === selectedTopic);
        setReward(filtered);
    }, [inventory]);
    
    console.log(reward);





    const giveAnswear = (englishSolution) => {

        if (actualWord.english === englishSolution) {
            setTrueAnswers(prevTrueAnswers => [(`${actualWord.english} :${actualWord.hungarian} `), ...prevTrueAnswers])
            setNumOfTrueAnswers(numOfTrueAnswers + 1)
        } else {
            setNumOfFalseAnswers(numOfFalseAnswers + 1)
            setFalseAnswers(prevFalseAnswers => [(`${actualWord.english} :${actualWord.hungarian} `), ...prevFalseAnswers])

        }
        setActualWord(words[words.indexOf(actualWord) + 1]);
    }

    const OKHandler = async (e) => {
        e.preventDefault();
    
        let trueAnswersString = ""
        let falseAnswersString = ""
        if (trueAnswers.length > 0) { trueAnswersString = trueAnswers.join(', ') } else { trueAnswersString = "" }
        if (falseAnswers.length > 0) { falseAnswersString = falseAnswers.join(', ') } else { falseAnswersString = "" }
    
        try {
            const response = await fetch('/api/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    topic: selectedTopic,
                    numOfWrongAnswers: numOfFalseAnswers,
                    numOfRightAnswers: numOfTrueAnswers,
                    createdAt: new Date(),
                    wrongAnswers: falseAnswersString,
                    rightAnswers: trueAnswersString,
                    percentage: (numOfTrueAnswers / (numOfFalseAnswers + numOfTrueAnswers) * 100)
                })
            });
    
            if (response.ok) {
                if (numOfFalseAnswers === 0) {
                    const inventoryIdToUpdate = reward._id
                    console.log(reward._id);
                    const patchResponse = await fetch(`/api/inventory/${inventoryIdToUpdate}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            bothCompleted: true
                        })
                    });
                    const patchUser = await fetch(`/api/users/${user._id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            points: user.points + 2
                        })
                    });
    
                    if (patchResponse.ok && patchUser.ok) {
                        props.setUser({ ...user, points: user.points + 2 })
                        navigate(`/home`);
                    } else {
                        console.error(patchResponse.status, patchResponse.statusText);
                    }
                } else {
                    console.log('Results successfully submitted, but not all answers are correct.');
                    navigate(`/home`);
                }
            } else {
                console.error(response.status, response.statusText);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <NavBar/>
            {(actualWord === undefined || words.length === 0) && (numOfFalseAnswers > 0 || numOfTrueAnswers > 0) ? (
                <>
                    <div>
                        You finished this test. Good answers: {numOfTrueAnswers}, wrong answers: {numOfFalseAnswers}
                        <button onClick={OKHandler} id="btn" className="ok">OK</button>
                    </div>
                </>
            ) : (
                <Word key={actualWord.english} word={actualWord} onGiveAnswear={giveAnswear} />
            )}
        </>
    );



};

export default Answear;