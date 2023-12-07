import React, { useState } from 'react'


const ResultEntity = (props) => {

    const [showingWrongs, setShowingWrongs] = useState(false)



    const showTheWrongAnswers = () => {
        if (showingWrongs === false) { setShowingWrongs(true) }
        else { setShowingWrongs(false) }



    }

    return (<div>
        <h2>Topic:{props.data.topic}</h2>
        <h4>Date of test:{props.data.createdAt.slice(0, 16).replace('T', ' ')}</h4>
        <h4>Result of test:{props.data.percentage} %</h4>
        <button onClick={showTheWrongAnswers}>Wrong answers</button>
        {showingWrongs ? (<>{props.data.wrongAnswers}</>) : (null)}
    </div>)
}


export default ResultEntity