import React, { useState } from 'react'


const ResultEntity = (props) => {

    const [showingWrongs, setShowingWrongs] = useState(false)



    const showTheWrongAnswers = () => {
        if (showingWrongs === false) { setShowingWrongs(true) }
        else { setShowingWrongs(false) }



    }

    return (<div className="selectTopic">
        <h2>Topic:{props.data.topic}</h2>
        <span>Date of test:{props.data.createdAt.slice(0, 16).replace('T', ' ')}</span>
        <span>Result of test:{props.data.percentage} %</span>
        <button onClick={showTheWrongAnswers}>Wrong answers</button>
        {showingWrongs ? (<div className="wrongs">{props.data.wrongAnswers}</div>) : (null)}
    </div>)
}


export default ResultEntity