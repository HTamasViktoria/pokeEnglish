import React, { useState } from 'react'


const NewWord = (props) => {

    const [english, setEnglish] = useState("")
    const [hungarian, setHungarian] = useState("")


    const submitAddNewHandler = (e) => {
        e.preventDefault()
        props.onAddingNewWord(english, hungarian)

    }

    return (
        <>
            {props.addedMessage === "" ? (<form onSubmit={submitAddNewHandler}>
                <label>english: <input type="text" onChange={(e) => { setEnglish(e.target.value) }} /></label>
                <label>hungarian: <input type="text" onChange={(e) => { setHungarian(e.target.value) }} /></label>
                <button type="submit">Add word</button>
            </form>) : (<><div>{props.addedMessage}</div><form onSubmit={submitAddNewHandler}>
                <label>english: <input type="text" onChange={(e) => { setEnglish(e.target.value) }} /></label>
                <label>hungarian: <input type="text" onChange={(e) => { setHungarian(e.target.value) }} /></label>
                <button type="submit">Add word</button>
            </form></>)}

        </>
    )

}

export default NewWord