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
        {topicAdded ? (<><NewTopicsWords topic={topic} pokemon={chosenPoke} /></>) : (<><h1 className="nTopic" >Add new topic</h1>
            <form onSubmit={topicSubmitHandler}>
                <label className='Tname' >Topic name:
                    <input type="text" onChange={(e) => setTopic(e.target.value)} />
                </label>
                <label><div className='pokeList' > {props.images.map((image, index) =>
                (<div id={image} key={index} className={`poke ${chosenPoke === image ? 'selectedP' : ''}`} >
                    <img onClick={(e) => setChosenPoke(e.target.id)} id={image} src={image} />
                </div>))}
                </div>
                </label>

                <button type="submit" id="btn" className='moveIt'>Add Topic</button></form>
        </>)}</>
    )
}

export default Addnew