import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Question from "../models/questionSchema.js";
import Answer from "../models/answerSchema.js";

// Create a question
export const createQuestion = catchAsyncErrors(async (req, res, next) => {
  const { title, body } = req.body;
  const userId = req.user._id;

  if (!title || !body) {
    return next(new ErrorHandler("Please provide title and body", 400));
  }

  const question = await Question.create({
    title,
    body,
    user: userId,
    answers: []
  });

  res.status(201).json({
    success: true,
    message: "Question posted successfully",
    question
  });
});

// Get all questions

export const getAllQuestions = catchAsyncErrors(async (req, res, next) => {
  const { title } = req.query;

  let filter = {};
  if (title) {
    filter.title = { $regex: title, $options: 'i' }; // case-insensitive
  }

  const questions = await Question.find(filter)
    .populate('user', 'username _id') // ✅ this line ensures frontend gets user info
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    questions
  });
});


// Get single question with answers
export const getQuestion = catchAsyncErrors(async (req, res, next) => {
  const question = await Question.findById(req.params.id)
    .populate('user', 'username')
    .populate({
      path: 'answers',
      populate: {
        path: 'user',
        select: 'username' 
      }
    });

  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Question fetched successfully",
    question
  });
});

// Update question
export const updateQuestion = catchAsyncErrors(async (req, res, next) => {
  const { title, body } = req.body;
  const questionId = req.params.id;
  const userId = req.user._id;
  const userRole = req.user.role;

  if (!title || !body) {
    return next(new ErrorHandler("Title and body are required", 400));
  }

  const question = await Question.findById(questionId);
  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  if (question.user.toString() !== userId.toString() && userRole !== 'admin') {
    return next(new ErrorHandler("Not authorized to update this question", 403));
  }

  question.title = title;
  question.body = body;
  await question.save();

  res.status(200).json({
    success: true,
    message: "Question updated successfully",
    question
  });
});

// Delete question
export const deleteQuestion = catchAsyncErrors(async (req, res, next) => {
  const questionId = req.params.id;
  const userId = req.user._id;
  const userRole = req.user.role;

  const question = await Question.findById(questionId);
  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  if (question.user.toString() !== userId.toString() && userRole !== 'admin') {
    return next(new ErrorHandler("Not authorized to delete this question", 403));
  }

  await Answer.deleteMany({ question: questionId });
  await question.deleteOne();

  res.status(200).json({
    success: true,
    message: "Question and its answers deleted successfully"
  });
});
