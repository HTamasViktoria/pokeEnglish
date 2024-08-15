import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Login = (props) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const [users, setUsers] = useState([])



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
                console.log('Login successful');
                props.setIsLoggedIn(true);
                const loggedInUser = users.find((user) => user.email === email)
                props.setUser(loggedInUser)
                navigate('/home');
              } else {
                console.log('Login failed:', responseData);
              }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/users')
                const data = await response.json()
                setUsers(data)
            } catch(err) {
                consolee.error(err)
            }
        }
        fetchUsers()
    }, [])

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form className="login-form" onSubmit={handleSubmit} >
                <div>
                    <label>Email</label>
                    <input type="email" className="login-input" placeholder='Enter Email here' onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" className="login-input" placeholder='Enter Password here' onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className="login-btn" type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login