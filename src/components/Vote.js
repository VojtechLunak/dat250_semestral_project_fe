import React from 'react';
import jwtDecode from 'jwt-decode';
import { castVote, getVoteOption } from '../api';

const Vote = ({ option }) => {
    const handleVote = async () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            alert('You need to be logged in to vote.');
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            const user = { username: decodedToken.sub }; 
            let voteOption = await getVoteOption(option.id);
            console.log("voteopt", voteOption)
            await castVote({
                voteOption: voteOption.data,
                user,
            });

            alert(`You successfully voted for: ${option.caption}`);
            window.location.reload();
        } catch (error) {
            console.error('Error casting vote:', error);
            alert('Failed to cast your vote. Please try again.');
        }
    };

    return (
        <div className="test">
            <span>{option.caption}</span>
            <button onClick={handleVote}>Vote</button>
        </div>
    );
};

export default Vote;
