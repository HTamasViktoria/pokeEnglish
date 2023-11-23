import React, { useState } from 'react'

const Word = (props) => {

    const [englishSolution, setEnglishSolution] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        props.onGiveAnswear(englishSolution)
    }


    return (<div>
        <form onSubmit={handleSubmit}>
            <label>{props.word.hungarian}: <input type="text" onChange={(e) => { setEnglishSolution(e.target.value) }} /></label>
            <button id='btn' >Submit</button>
        </form>
    </div>)
}

export default Word