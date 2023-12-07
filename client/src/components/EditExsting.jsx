import React, { useState, useEffect } from 'react'

const EditExisting = () => {

    const [allTopics, setAllTopics] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [words, setWords] = useState([])
    const [modifiedEnglish, setModifiedEnglish] = useState("")
    const [modifiedHungarian, setModifiedHungarian] = useState("")
    const [url, setUrl] = useState("")
    const [topic, setTopic] = useState('')
    const [hungarian, setHungarian] = useState('')
    const [english, setEnglish] = useState('')

    useEffect(() => {
        fetch('/api/topics', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setAllTopics(data))
            .catch(error => console.error(error))
    }, ([]))

    const editHandler = (e) => {
        setIsEditing(true)
        const topic = e.target.id
        const url = e.target.className;
        setUrl(url)
        setTopic(topic)
        fetch(`/api/words/${topic}`, {
            method: 'GET'
        }).then(response => response.json())
            .then(data => setWords(data))
            .catch(error => console.error(error))
    }

    const editSubmit = (e) => {
        e.preventDefault()
        fetch(`/api/word/${e.target.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                modifiedEnglish: modifiedEnglish,
                modifiedHungarian: modifiedHungarian
            })
        })
            .then(response => console.log(response))
            //valahogy a submitról levenni a kijelölést
            .catch(error => console.error(error))
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/word/${id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                setWords((prevWords) => prevWords.filter((word) => word._id !== id));
            } else {
                console.error('Failed to delete the word');
            }
        } catch(err) {
            console.error(err);
        }
    };

    const englishHandler = (e) => {
        setModifiedEnglish(e.target.value)
        if (modifiedHungarian === "") { setModifiedHungarian(e.target.id) }
    }

    const hungarianHandler = (e) => {
        setModifiedHungarian(e.target.value)
        if (modifiedEnglish === "") { setModifiedEnglish(e.target.id) }
    }

    const handleSubmitNew = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/addnew', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ english, hungarian, topic })
            });
    
            if (response.ok) {
                const responseData = await response.json();
                setWords((prevWords) => [...prevWords, responseData]);
                console.log(responseData);
            } else {
                console.error('Failed to add a new word');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (isEditing ? (<div>{words.map((word) => <form id={word._id} onSubmit={editSubmit} key={word._id} className='topicForm' >
        <input id={word.english} placeholder={word.hungarian} onChange={hungarianHandler} /> -
        <input id={word.hungarian} placeholder={word.english} onChange={englishHandler} />
        <button type="submit" id="btn" className='move'>Submit</button>
        <button id="btn" className='move' onClick={() => handleDelete(word._id)} >Delete</button>
    </form>)}
        <p className='txt' >or add a new word</p>
        <form className='topicForm' onSubmit={handleSubmitNew}>
            <input id='newWord' value={hungarian} onChange={(e) => setHungarian(e.target.value)} /> -
            <input id='newWord' value={english} onChange={(e) => setEnglish(e.target.value)} />
            <button type="submit" id='btn' className='move'>Submit</button>
        </form>
        <div><img src={url} className='Preward' /></div>
    </div>) : (<div className='pokeContainer' >
        {allTopics.map((topic, index) =>
            <div key={index} className='editP' >
                <div key={topic.name}>
                    {topic.name}
                </div>
                <img src={topic.url.default} alt={topic.name} />
                <button id={topic.name} className={topic.url.default} onClick={editHandler}>Edit</button>
            </div>)}
    </div>)
    )
}

export default EditExisting