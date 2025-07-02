import express from 'express';
import {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getQuestionAnswers,
  upvoteAnswer,
  downvoteAnswer,
  removeVote
} from '../controllers/answerController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/question/:questionId', getQuestionAnswers);

// Protected routes
router.post('/', isAuthenticated, createAnswer);
router.put('/:id', isAuthenticated, updateAnswer);
router.delete('/:id', isAuthenticated, deleteAnswer);

// Voting routes
router.post('/:id/upvote', isAuthenticated, upvoteAnswer);
router.post('/:id/downvote', isAuthenticated, downvoteAnswer);
router.delete('/:id/vote', isAuthenticated, removeVote); // For removing vote

export default router;