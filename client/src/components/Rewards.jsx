import React, { useState, useEffect } from 'react'
import NavBar from "./Navbar"

const Rewards = () => {

    const [actualReward, setActualReward] = useState("")
    const [rewards, setRewards] = useState([])
    const [lastReward, setLastReward] = useState("")

    useEffect(() => {
        fetch('/api/rewards', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setRewards(data))
    }, [])


    useEffect(() => {
        setActualReward("")
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
                createdAt: Date.now()
            })
        })
            .then(response => response.json())
            .then(data => setLastReward(data.text))
    }

    return (<>
        <NavBar/>
        <div>Here you can create rewards for the topics difficult for your child.
        </div>
        {rewards.map((reward) => <div key={reward._id}>{reward.text}</div>)}
        <form onSubmit={rewardSubmit}>
            <label>Reward:
                <input type="text" value={actualReward} onChange={(e) => setActualReward(e.target.value)} />
            </label>
            <button type="submit">Submit</button></form>
    </>
    )


}

export default Rewards