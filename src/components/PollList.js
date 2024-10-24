import React, { useEffect, useState } from 'react';
import { getAllPolls } from '../api';
import { Link } from 'react-router-dom';

const PollList = () => {
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        const fetchPolls = async () => {
            try {
                const response = await getAllPolls();
                setPolls(response.data);
            } catch (error) {
                console.error('Error fetching polls:', error);
            }
        };
        fetchPolls();
    }, []);

    return (
        <div className="container">
            <h2>Poll List</h2>
            <ul>
                {polls.map((poll) => (
                    <li key={poll.id}>
                        <Link to={`/poll/${poll.id}`}>{poll.question}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/create-poll">Create New Poll</Link>
        </div>
    );
};

export default PollList;
