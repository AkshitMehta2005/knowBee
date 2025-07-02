import express from 'express';
import {
  createQuestion,
  getAllQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion
} from '../controllers/questionController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllQuestions);
router.get('/:id', getQuestion);

// Protected routes (require authentication)
router.post('/', isAuthenticated, createQuestion);
router.put('/:id', isAuthenticated, updateQuestion);
router.delete('/:id', isAuthenticated, deleteQuestion);

export default router; 