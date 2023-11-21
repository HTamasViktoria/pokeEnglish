import React, { useState } from 'react'
import NewWord from './NewWord'

const AddNewWords = () => {

    const [addingNew, setAddingNew] = useState(false)
    const [topic, setTopic] = useState("")
    const [topicSubmitted, setTopicSubmitted] = useState("")
    //valamit kitaláni arra az esetre, ha úgy gondolta, hogy egy topichoz eleget írt, és új topicot szeretne kezdeni
    //vagy a topic nevét módosítaná
    const [saved, setSaved] = useState(false)
    const [addedMessage, setAddedMessage] = useState("")

    let pokemonArray = [
        "Bulbasaur", "Ivysaur", "Venusaur", "Charmander", "Charmeleon", "Charizard", "Squirtle", "Wartortle", "Blastoise", "Caterpie", "Metapod",
        "Butterfree", "Weedle", "Kakuna", "Beedrill", "Pidgey", "Pidgeotto", "Pidgeot", "Rattata", "Raticate", "Spearow", "Fearow", "Ekans", "Arbok",
        "Pikachu", "Raichu", "Sandshrew", "Sandslash", "Nidoran♀", "Nidorina", "Nidoqueen", "Nidoran♂", "Nidorino", "Nidoking", "Clefairy", "Clefable",
        "Vulpix", "Ninetales", "Jigglypuff", "Wigglytuff", "Zubat", "Golbat", "Oddish", "Gloom", "Vileplume", "Paras", "Parasect"
    ];

    let pokeImageArray = []

    const addNewHandler = () => {
        setAddingNew(true)
    }

    const topicSubmitHandler = (e) => {
        e.preventDefault()
        setTopicSubmitted(topic)
        console.log(topic)
    }

    const newHandler = (english, hungarian) => {
        console.log(english)
        console.log(hungarian)
        console.log(topicSubmitted)

        fetch('/api/addnew', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                english: english,
                hungarian: hungarian,
                topic: topic,
                date: Date.now()
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => setAddedMessage(`The english word ${english} (hungarian:${hungarian}) added successfully for the collection ${topic}`))
            .catch(error => console.error(error))

    }
    //itt még csak a front_defaultot lekérni, csak egy képet, és ha a mentésre katt, akkor kérje annak a pokénak minden képét,
    //és továbbítsa az adatbázisba
    const onTopicChange = async (e) => {
        e.preventDefault()
        setTopic(e.target.value)

        for (let pokemon of pokemonArray) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            const data = await response.json()
            const url = data.sprites.front_default;



        }

    }



    //a setTopic anonom fgv-t egy itteni függvénybe rakni, és az onchange-re hívni azt is pár mp-es késéssel,
    //hogy megnézze az adatbázisban, van-e már ahhoz hozzárendelt pokémon- ha van, edit lehetőség-uaz a vége, mint a következőnek
    //ha nincs, mert még új topic, akkor kell feljönnie a lehetőségnek, hogy válasszon pokémont hozzá



    return (
        <>
            <div>Here you can add words to your child's learning list.
                It's best to neatly copy the words from their dictionary that they need to learn. We know this might be a big task,
                but don't worry – you only need to enter the words once, and the app will remember them from then on.</div>

            {topicSubmitted == "" ? (<form onSubmit={topicSubmitHandler}>
                <label>Date or topic: <input type="text" onChange={onTopicChange} /></label>
                <button type="submit">Submit date or topic</button>
            </form>) : (<h3>Topic: {topicSubmitted}</h3>)}
            {/*If topic is submitted, just show it, if not, show the input for it */}

            <br />
            {addingNew === false ? (<button onClick={addNewHandler}>+ Add word</button>) : (<NewWord addedMessage={addedMessage} onAddingNewWord={newHandler} />)}

        </>
    )

}

export default AddNewWords