import React, { useState, useEffect } from 'react'
import NavBar from "./Navbar"

const Rewards = (props) => {

    const [actualReward, setActualReward] = useState("")
    const [actualPoints, setActualPoints] = useState("")
    const [rewards, setRewards] = useState([])
    const [lastReward, setLastReward] = useState("")
    const user = props.user

    useEffect(() => {
        fetch('/api/rewards', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRewards(data))
    }, [])


    useEffect(() => {
        setActualReward("")
        setActualPoints('')
        fetch('/api/rewards', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRewards(data))
    }, [lastReward])


    const rewardSubmit = (e) => {

        e.preventDefault()
        fetch('/api/reward', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: actualReward,
                points: actualPoints,
                createdAt: Date.now()
            })
        })
            .then(response => response.json())
            .then(data => setLastReward(data))
    }

    return (<>
        <NavBar/>
        <div>Here you can create rewards for the topics difficult for your child.
        </div>
        {rewards.map((reward) => <div className={"reward"} key={reward._id}>
            <p>{reward.text}</p>
            <p>Points: {reward.points}</p>
        </div>)}
        <form onSubmit={rewardSubmit}>
            <label>Name:
                <input type="text" value={actualReward} onChange={(e) => setActualReward(e.target.value)} />
            </label>
            <label>Points:
                <input type="text" value={actualPoints} onChange={(e) => setActualPoints(e.target.value)} />
            </label>
            <button type="submit">Submit</button></form>
    </>
    )


}

export default Rewards