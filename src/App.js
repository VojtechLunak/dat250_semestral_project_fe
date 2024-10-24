import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PollList from './components/PollList';
import PollDetail from './components/PollDetail';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import CreatePoll from './components/CreatePoll';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="container">
                <h1>Poll App</h1>
                <Routes>
                    <Route path="/" element={<PollList />} />
                    <Route path="/polls" element={<PollList />} />
                    <Route path="/poll/:id" element={<PollDetail />} />
                    <Route path="/register" element={<UserRegistration />} />
                    <Route path="/login" element={<UserLogin />} />
                    <Route path="/create-poll" element={<CreatePoll />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
