import React, { useState } from 'react';
import { createPoll, createVoteOption } from '../api';
import { useNavigate } from 'react-router-dom';

const CreatePoll = () => {
    const [question, setQuestion] = useState('');
    const [voteOptions, setVoteOptions] = useState([{ caption: '', presentationOrder: 1 }]);
    const navigate = useNavigate();

    const handleOptionChange = (index, value) => {
        const options = [...voteOptions];
        options[index].caption = value;
        setVoteOptions(options);
    };

    const handleAddOption = () => {
        setVoteOptions([...voteOptions, { caption: '', presentationOrder: voteOptions.length + 1 }]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const poll = { question, voteOptions };
    
        try {
            const createdPoll =await createPoll(poll);
            
            for (const option of voteOptions) {
                await createVoteOption({ caption: option.caption, presentationOrder: option.presentationOrder, poll: createdPoll.id });
            }
    
            navigate('/polls'); 
        } catch (error) {
            console.error(error);
            alert('Failed to create poll. Try again.');
        }
    };
    

    return (
        <div className="container">
            <h2>Create Poll</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Poll Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                />
                {voteOptions.map((option, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option.caption}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        required
                    />
                ))}
                <button type="button" onClick={handleAddOption}>
                    Add Option
                </button>
                <button type="submit">Create Poll</button>
            </form>
        </div>
    );
};

export default CreatePoll;
