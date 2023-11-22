import React, { useState, useEffect } from 'react'
import NavBar from './Navbar'

const LeaveMessage = () => {

    const [actualMessage, setActualMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [lastMessage, setLastMessage] = useState("")

    useEffect(() => {
        fetch('/api/messages', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setMessages(data))
    }, [])


    useEffect(() => {
        setActualMessage("")
        fetch('/api/messages', {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setMessages(data))
    }, [lastMessage])


    const messageSubmit = (e) => {

        e.preventDefault()
        fetch('/api/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: actualMessage,
                createdAt: Date.now()
            })
        })
            .then(response => response.json())
            .then(data => setLastMessage(data.text))
    }

    return (<>
        <NavBar/>
        <div>Here you can leave a message to your child. Either you'd like to tell them what to learn/repet,
            either you just want to encourage them, we give you place for this.
        </div>
        {messages.map((message) => <div key={message._id}>{message.text}</div>)}
        <form onSubmit={messageSubmit}>
            <label>Message:
                <input type="text" value={actualMessage} onChange={(e) => setActualMessage(e.target.value)} />
            </label>
            <button type="submit">Submit</button></form>
    </>
    )


}

export default LeaveMessage