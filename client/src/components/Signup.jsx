import React, { useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"



const Signup = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { name, email, password }
        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            response.json
            console.log(response)
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Name</label>
                    <input type="text" placeholder='Enter Name here' onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder='Enter Email here' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder='Enter Password here' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Register</button>
            </form>
            <p>Already have an Account?</p>
            <Link to='/login' >Login</Link>
        </div>
    )
}

export default Signup