import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = { email, password }
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();
            if (responseData === 'Success') {
                navigate('/home');
            } else {
                console.log(responseData);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Email</label>
                    <input type="email" placeholder='Enter Email here' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" placeholder='Enter Password here' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login