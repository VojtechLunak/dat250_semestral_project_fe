import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PollList from './components/PollList';
import PollDetail from './components/PollDetail';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import CreatePoll from './components/CreatePoll';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                {/* Navigation Bar */}
                <nav className="navbar">
                    <ul className="navbar-list">
                        <li><Link to="/">FeedApp</Link></li>
                        <li><Link to="/polls">Polls</Link></li>
                        <li><Link to="/create-poll">Create Poll</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </ul>
                </nav>

                <div className="content-container">
                    {/* Application Content */}
                    <Routes>
                        <Route path="/" element={<PollList />} />
                        <Route path="/polls" element={<PollList />} />
                        <Route path="/poll/:id" element={<PollDetail />} />
                        <Route path="/register" element={<UserRegistration />} />
                        <Route path="/login" element={<UserLogin />} />
                        <Route path="/create-poll" element={<CreatePoll />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
