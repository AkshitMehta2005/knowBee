import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
});

// Questions
export const fetchQuestions = () => API.get('/question');
export const fetchQuestion = (id) => API.get(`/question/${id}`);
export const createQuestion = (questionData) => API.post('/question', questionData);
export const updateQuestion = (id, questionData) => API.put(`/question/${id}`, questionData);
export const deleteQuestion = (id) => API.delete(`/question/${id}`);

// Answers
export const fetchQuestionAnswers = (questionId) => API.get(`/answer/question/${questionId}`);
export const createAnswer = (answerData) => API.post('/answer', answerData);
export const updateAnswer = (id, answerData) => API.put(`/answer/${id}`, answerData);
export const deleteAnswer = (id) => API.delete(`/answer/${id}`);
export const upvoteAnswer = (id) => API.post(`/answer/${id}/upvote`);
export const downvoteAnswer = (id) => API.post(`/answer/${id}/downvote`);
export const removeVote = (id) => API.delete(`/answer/${id}/vote`);

// Users
export const register = (userData) => API.post('/user/register', userData);
export const login = (userData) => API.post('/user/login', userData);
export const logout = () => API.get('/user/logout');
export const getCurrentUser = () => API.get('/user/me');