import React, { useEffect, useState } from 'react';
import { getAllPolls } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const isTokenValidFormat = (token) => token && token.split('.').length === 3;

const isTokenExpired = (token) => {
    console.log('Raw token from localStorage:', token); // Debug token retrieval
    if (!isTokenValidFormat(token)) {
        console.error('Invalid token format.');
        return true; // Treat invalid tokens as expired
    }
    console.log('Token format is valid:', token);

    try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);
        const currentTime = Date.now() / 1000; 
        return decoded.exp < currentTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Treat decoding errors as expired
    }
};

const PollList = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPolls = async () => {
            const token = localStorage.getItem('authToken');
            if (!token || isTokenExpired(token)) {
                alert('Your session has expired or the token is invalid. Please log in again.');
                localStorage.removeItem('authToken');
                navigate('/login');
                return;
            }
        
            try {
                const response = await getAllPolls(token);  
                setPolls(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
                
            } finally {
                setLoading(false);
            }
        };
        

        fetchPolls();
    }, [navigate]);

    if (loading) {
        return <div className="container">Loading polls...</div>;
    }

    return (
        <div className="container">
            <h2>Poll List</h2>
            {polls.length > 0 ? (
                <ul>
                    {polls.map((poll) => (
                        <li key={poll.id}>
                            <Link to={`/poll/${poll.id}`}>{poll.question}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No polls available. Be the first to <Link to="/create-poll">create one</Link>!</p>
            )}
        </div>
    );
};

export default PollList;
