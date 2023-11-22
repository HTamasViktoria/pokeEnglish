import React, { useState } from 'react'
import NewTopicsWords from './NewTopicsWords'

const Addnew = (props) => {
    const [topic, setTopic] = useState('')
    const [chosenPoke, setChosenPoke] = useState('')
    const [topicAdded, setTopicAdded] = useState(false)


    const topicSubmitHandler = (e) => {
        e.preventDefault()


        fetch('/api/addNewTopic', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: topic,
                url: chosenPoke,
                createdAt: Date.now(),
            })
        })
            .then(response => response.json())
            .then(setTopicAdded(true))
            .catch(error => console.error(error))
    }

    return (<>
        {topicAdded ? (<><NewTopicsWords topic={topic} pokemon={chosenPoke} /></>) : (<><h1>Addnew</h1>
            <form onSubmit={topicSubmitHandler}>
                <label>Topic neve:
                    <input type="text" onChange={(e) => setTopic(e.target.value)} />
                </label>
                <label>Ez a pokémon jár érte: <div> {props.images.map((image) =>
                (<div id={image} key={image}>
                    <img onClick={(e) => setChosenPoke(e.target.id)} id={image} src={image} />
                </div>))}
                </div>
                </label>

                <button type="submit">Topic hozzáadása</button></form>
        </>)}</>
    )
}

export default Addnew