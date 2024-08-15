import React, { useState } from 'react'

const NewTopicsWords = (props) => {

    const [addingNewWord, setAddingNewWord] = useState(false)
    const [hungarian, setHungarian] = useState('')
    const [english, setEnglish] = useState('')
    const [wordsOfTopic, setWordsOfTopic] = useState([])

    const wordSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            // Új szó hozzáadása
            const response = await fetch('/api/addnew', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    english: english,
                    hungarian: hungarian,
                    topic: props.topic,
                    date: Date.now(),
                })
            });

            const newData = await response.json();
            console.log(newData);

            // Az input mezők ürítése
            setEnglish("");
            setHungarian("");

            // A topic szavainak frissítése
            const wordsResponse = await fetch(`/api/words/${props.topic}`, {
                method: 'GET'
            });

            const wordsData = await wordsResponse.json();
            setWordsOfTopic(wordsData);
            console.log(wordsData);
        } catch (error) {
            console.error('Hiba történt a szó hozzáadása közben:', error);
        }
    };


    return (
        <>
            <div className='txtt' >
                Here you can fill your freshly created topic with words. We do suggest that one topic should have at least 20 words.
            </div>
            <div className='addingNew' >
                <h2 className='txttt' >Topic: {props.topic}</h2>
                <div>
                    <img className='pkmn' src={props.pokemon.default} />
                </div>
                {wordsOfTopic.map((word) => <div  key={word}>{word.english} - {word.hungarian}</div>)}
                {!addingNewWord ? (
                    <button onClick={() => setAddingNewWord(true)} id="btn" >+ Add new word to this topic</button>
                ) : (<><form className="frm" onSubmit={wordSubmitHandler}>
                    <label>English: <input value={english} onChange={(e) => setEnglish(e.target.value)} type="text" />
                    </label>
                    <label>Hungarian: <input value={hungarian} onChange={(e) => setHungarian(e.target.value)} type="text" />
                    </label>
                    <button type="submit" id='btn' >Add</button>
                </form></>)}
            </div>
        </>
    );


}
export default NewTopicsWords