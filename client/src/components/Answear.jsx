import React, { useEffect, useState } from "react";
import NavBar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";
import Word from './Word'



const Answear = () => {

    const { selectedTopic } = useParams()
    const [words, setWords] = useState([])
    const [actualWord, setActualWord] = useState({})
    const [numOfTrueAnswers, setNumOfTrueAnswers] = useState(0)
    const [numOfFalseAnswers, setNumOfFalseAnswers] = useState(0)
    const [trueAnswers, setTrueAnswers] = useState([])
    const [falseAnswers, setFalseAnswers] = useState([])
    const [finish, setFinish] = useState([])


    useEffect(() => {
        console.log(selectedTopic)
        fetch(`/api/words/${selectedTopic}`, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setWords(data);

                setActualWord(data[0])
            })

            .catch(error => {
                console.error('Error fetching data:', error);

            });
    }, []);



    useEffect(() => {
        console.log("useeffect indul");

        if (finish === true) {
            const trueAnswersString = trueAnswers.join(', ');
            const falseAnswersString = falseAnswers.join(', ');

            fetch('/api/results', {
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
            })
                .then(response => console.log(response))
                .catch(error => console.error(error));
        }
    }, [finish]);


    const giveAnswear = (englishSolution) => {

        if (actualWord.english === englishSolution) {
            setTrueAnswers(prevTrueAnswers => [(`${actualWord.english} :${actualWord.hungarian} `), ...prevTrueAnswers])
            setNumOfTrueAnswers(numOfTrueAnswers + 1)
        } else {
            setNumOfFalseAnswers(numOfFalseAnswers + 1)
            setFalseAnswers(prevFalseAnswers => [(`${actualWord.english} :${actualWord.hungarian} `), ...prevFalseAnswers])

        }
        if ((numOfFalseAnswers + numOfTrueAnswers) === words.length) { setFinish([1, 2]) }
        //words.indexOf(actualWord) == words.length - 1

        setActualWord(words[words.indexOf(actualWord) + 1]);
    }

    return (
        <>
            {(actualWord === undefined || words.length === 0) && (numOfFalseAnswers > 0 || numOfTrueAnswers > 0) ? (
                <>
                    <div>
                        You finished this test. Good answers: {numOfTrueAnswers}, wrong answers: {numOfFalseAnswers}
                    </div>
                </>
            ) : (
                <Word key={actualWord.english} word={actualWord} onGiveAnswear={giveAnswear} />
            )}
        </>
    );



};

export default Answear;