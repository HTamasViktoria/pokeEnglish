import React, { useState, useEffect } from 'react'

const EditExisting = () => {

    const [allTopics, setAllTopics] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [words, setWords] = useState([])
    const [modifiedEnglish, setModifiedEnglish] = useState("")
    const [modifiedHungarian, setModifiedHungarian] = useState("")
    const [url, setUrl] = useState("")

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


    const englishHandler = (e) => {
        setModifiedEnglish(e.target.value)
        if (modifiedHungarian === "") { setModifiedHungarian(e.target.id) }
    }

    const hungarianHandler = (e) => {
        setModifiedHungarian(e.target.value)
        if (modifiedEnglish === "") { setModifiedEnglish(e.target.id) }
    }

    return (isEditing ? (<div>{words.map((word) => <form id={word._id} onSubmit={editSubmit} key={word._id}>
        <input id={word.english} placeholder={word.hungarian} onChange={hungarianHandler} /> -
        <input id={word.hungarian} placeholder={word.english} onChange={englishHandler} />
        <button type="submit">Submit</button>
    </form>)}
        <div><img src={url} /></div>
    </div>) : (<div>
        {allTopics.map((topic, index) =>
            <div key={index}>
                <div key={topic.name}>
                    {topic.name}
                </div>
                <img src={topic.url} alt={topic.name} />
                <button id={topic.name} className={topic.url} onClick={editHandler}>Edit</button>
            </div>)}
    </div>)
    )
}

export default EditExisting