import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_URL,
});

// Add a request interceptor to include the token
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Export functions using the Axios instance
export const registerUser = (credentials) => axios.post(`http://localhost:8080/register`, credentials);
export const loginUser = (credentials) => axios.post(`http://localhost:8080/login`, credentials);

export const getAllPolls = (token) => {
    return apiClient.get('/polls', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};

export const getPoll = (id) => apiClient.get(`/polls/${id}`);
export const createPoll = (poll) => apiClient.post('/polls', poll);
export const createVoteOption = (voteOption) => apiClient.post('/vote-options', voteOption);
export const getVoteOption = (id) => apiClient.get(`/vote-options/${id}`);
export const castVote = ( voteData ) => {
    return apiClient.post(`/votes`, voteData); 
};

