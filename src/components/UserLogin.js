import React, { useState } from 'react';
import { loginUser } from '../api';

const UserLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const credentials = { username, password };
        try {
            await loginUser(credentials);
            alert('Login successful!');
            // Redirect to poll list or home
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
