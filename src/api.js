import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; 

export const getAllPolls = () => axios.get(`${API_URL}/polls`);
export const getPoll = (id) => axios.get(`${API_URL}/polls/${id}`);
export const createPoll = (poll) => axios.post(`${API_URL}/polls`, poll);
export const registerUser = (user) => axios.post(`${API_URL}/users`, user);
export const loginUser = (credentials) => axios.post(`${API_URL}/login`, credentials);
export const createVoteOption = (voteOption) => axios.post(`${API_URL}/vote-options`, voteOption);