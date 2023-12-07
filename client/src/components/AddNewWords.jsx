import React, { useState, useEffect } from 'react'
import NewWord from './NewWord'
import ChoosePokeImage from './ChoosePokeImage'
import EditExisting from './EditExsting'
import Addnew from './Addnew'
import NavBar from './Navbar'

const AddNewWords = () => {


    const [topic, setTopic] = useState("")
    const [topicSubmitted, setTopicSubmitted] = useState("")
    const [saved, setSaved] = useState(false)
    const [addedMessage, setAddedMessage] = useState("")
    const [pokeImages, setPokeImages] = useState([])

    const [editExisting, setEditExisting] = useState(false)
    const [addnew, setAddnew] = useState(false)

    let pokemonArray = [
        "bulbasaur", "jigglypuff", "charizard", "blastoise", "teddiursa", "skitty", "squirtle", "togepi", "mew",
        "pikachu", "meowth", "woobat", "caterpie", "vulpix", "zubat", "cutiefly", "sneasel", "heracross",
        "snubbull", "aipom", "totodile", "cyndaquil", "chikorita", "dragonite", "moltres", "magmar", "electabuzz",
        "scorbunny"
    ];



    //////////////////////////////////////////////////////////lekéri az összes poké 1 db képét
    useEffect(() => {
        const fetchData = async () => {
            const pokeImageArray = [];
    
            for (let pokemon of pokemonArray) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
                const data = await response.json();
                
                const imageObject = {
                    default: data.sprites.front_default,
                    shiny: data.sprites.front_shiny
                };
    
                pokeImageArray.push(imageObject);
            }
    
            setPokeImages(pokeImageArray);
            
        };
    
        fetchData();
    }, []);
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////handling the data coming from Addnew, where 
    //user can choose new topic name and pokemon
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
                poke: chosenPoke,
                date: Date.now()
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .then(data => setAddedMessage(`The english word ${english} (hungarian:${hungarian}) added successfully for the collection ${topic}`))
            .catch(error => console.error(error))

    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    return (
        <>
            <NavBar />
            {!editExisting && !addnew && (
                <div className="intro-text">
                    Here you can add words to your child's learning list.
                    It's best to neatly copy the words from their dictionary that they need to learn. We know this might be a big task,
                    but don't worry – you only need to enter the words once, and the app will remember them from then on.
                </div>
            )}

            {editExisting ? (
                <EditExisting />
            ) : addnew ? (
                <Addnew images={pokeImages} />
            ) : (
                <>
                    <button className="action-button" onClick={() => setEditExisting(true)}>
                        Existing topics
                    </button>
                    <button className="action-button" onClick={() => setAddnew(true)}>
                        Add new topic
                    </button>
                </>
            )}
        </>
    );
};


export default AddNewWords