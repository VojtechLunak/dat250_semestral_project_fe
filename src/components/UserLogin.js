import React, { useState } from 'react';
import { loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
        try {
            const response = await loginUser(credentials);
            const token = response.data; 
            localStorage.setItem('authToken', token); // Store token in localStorage
            alert('Login successful!');
            navigate('/polls'); 
        } catch (error) {
            console.error(error);
            alert('Login failed. Check your credentials.');
        }
    };

    return (
        <div className="container">
            <h2>User Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default UserLogin;
