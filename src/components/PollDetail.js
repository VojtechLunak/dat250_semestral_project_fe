import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPoll } from '../api';
import Vote from './Vote';

const PollDetail = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);

    useEffect(() => {
        const fetchPoll = async () => {
            try {
                const response = await getPoll(id);
                setPoll(response.data);
            } catch (error) {
                console.error('Error fetching poll:', error);
            }
        };
        fetchPoll();
    }, [id]);

    if (!poll) {
        return <div>Loading poll...</div>;
    }

    const filteredVoteOptions = poll.voteOptions.filter(option => option.id !== null);

    return (
        <div className="container">
           <h2>{poll.question}, Total votes: {poll.votes ? poll.votes.length : 0}</h2>
            <h3>Vote Options</h3>
            <ul>
                {filteredVoteOptions.map((option) => (
                    <li key={option.id}>
                        <Vote option={option} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PollDetail;
