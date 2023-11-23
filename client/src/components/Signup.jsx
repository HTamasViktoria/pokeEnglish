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
        <div className="signup-container">
            <h2 className="register-title">Register</h2>
            <form className="register-form" onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" className="register-input" placeholder='Enter Name here' onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" className="register-input" placeholder='Enter Email here' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" className="register-input" placeholder='Enter Password here' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="register-btn" type="submit">Register</button>
            </form>
            <p>Already have an Account?</p>
            <Link className="login-link" to='/login' >Login</Link>
        </div>
    )
}

export default Signup