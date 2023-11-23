import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Word from './Word'



const Answear = () => {
    const navigate = useNavigate();
    const { selectedTopic } = useParams()
    const [words, setWords] = useState([])
    const [actualWord, setActualWord] = useState({})
    const [numOfTrueAnswers, setNumOfTrueAnswers] = useState(0)
    const [numOfFalseAnswers, setNumOfFalseAnswers] = useState(0)
    const [trueAnswers, setTrueAnswers] = useState([])
    const [falseAnswers, setFalseAnswers] = useState([])
    const [finish, setFinish] = useState(false)



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
        console.log("ok handler runs")
        e.preventDefault();

        const trueAnswersString = trueAnswers.join(', ');
        const falseAnswersString = falseAnswers.join(', ');

        try {
            const response = await fetch('/api/results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    topic: selectedTopic,
                    numofWrongAnswers: numOfFalseAnswers,
                    numOfRightAnswers: numOfTrueAnswers,
                    createdAt: Date.now(),
                    wrongAnswers: falseAnswersString,
                    rightAnswers: trueAnswersString,
                })
            });
            if (response.ok) {
                console.log('Results successfully submitted.');
                navigate(`/home/Tasks/`)
            } else {
                console.error('Failed to submit results. Server returned:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while submitting results:', error);
        }
    };


    return (
        <>
            <NavBar/>
            {(actualWord === undefined || words.length === 0) && (numOfFalseAnswers > 0 || numOfTrueAnswers > 0) ? (
                <>
                    <div>
                        You finished this test. Good answers: {numOfTrueAnswers}, wrong answers: {numOfFalseAnswers}
                        <button onClick={OKHandler}>OK</button>
                    </div>
                </>
            ) : (
                <Word key={actualWord.english} word={actualWord} onGiveAnswear={giveAnswear} />
            )}
        </>
    );



};

export default Answear;