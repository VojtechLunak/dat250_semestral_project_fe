import React from 'react';

const Vote = ({ option }) => {
    const handleVote = () => {
        // Logic to cast a vote for this option
        alert(`You voted for: ${option.caption}`);
    };

    return (
        <div className='test'>
            <span>{option.caption}</span>
            <button onClick={handleVote}>Vote</button>
        </div>
    );
};

export default Vote;
