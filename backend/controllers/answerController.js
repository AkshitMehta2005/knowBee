import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import Answer from "../models/answerSchema.js";
import Question from "../models/questionSchema.js";

// Create an answer
export const createAnswer = catchAsyncErrors(async (req, res, next) => {
  const { questionId, body } = req.body;
  const userId = req.user._id;

  if (!questionId || !body) {
    return next(new ErrorHandler("Please provide question ID and answer body", 400));
  }

  const question = await Question.findById(questionId);
  if (!question) {
    return next(new ErrorHandler("Question not found", 404));
  }

  const answer = await Answer.create({
    question: questionId,
    user: userId,
    body
  });

  question.answers.push(answer._id);
  await question.save();

  res.status(201).json({
    success: true,
    message: "Answer posted successfully",
    answer
  });
});

// Update answer
export const updateAnswer = catchAsyncErrors(async (req, res, next) => {
  const { body } = req.body;
  const answerId = req.params.id;
  const userId = req.user._id;
  const userRole = req.user.role;

  if (!body) {
    return next(new ErrorHandler("Answer body is required", 400));
  }

  const answer = await Answer.findById(answerId);
  if (!answer) {
    return next(new ErrorHandler("Answer not found", 404));
  }

  if (answer.user.toString() !== userId.toString() && userRole !== 'admin') {
    return next(new ErrorHandler("Not authorized to update this answer", 403));
  }

  answer.body = body;
  await answer.save();

  res.status(200).json({
    success: true,
    message: "Answer updated successfully",
    answer
  });
});

// Delete answer
export const deleteAnswer = catchAsyncErrors(async (req, res, next) => {
  const answerId = req.params.id;
  const userId = req.user._id;
  const userRole = req.user.role;

  const answer = await Answer.findById(answerId);
  if (!answer) {
    return next(new ErrorHandler("Answer not found", 404));
  }

  if (answer.user.toString() !== userId.toString() && userRole !== 'admin') {
    return next(new ErrorHandler("Not authorized to delete this answer", 403));
  }

  await Question.findByIdAndUpdate(answer.question, {
    $pull: { answers: answerId }
  });

  await answer.deleteOne();

  res.status(200).json({
    success: true,
    message: "Answer deleted successfully"
  });
});

// Get answers for a question
export const getQuestionAnswers = catchAsyncErrors(async (req, res, next) => {
  const questionId = req.params.questionId;

  const answers = await Answer.find({ question: questionId })
    .populate('user', 'username')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    message: "Answers fetched successfully",
    answers
  });
});

// Upvote an answer
export const upvoteAnswer = catchAsyncErrors(async (req, res, next) => {
  const answerId = req.params.id;
  const userId = req.user._id;

  const answer = await Answer.findById(answerId);
  if (!answer) {
    return next(new ErrorHandler("Answer not found", 404));
  }

  if (answer.upvotes.includes(userId)) {
    return next(new ErrorHandler("You already upvoted this answer", 400));
  }

  answer.downvotes.pull(userId);
  answer.upvotes.push(userId);
  await answer.save();

  res.status(200).json({
    success: true,
    message: "Answer upvoted successfully",
    answer
  });
});

// Downvote an answer
export const downvoteAnswer = catchAsyncErrors(async (req, res, next) => {
  const answerId = req.params.id;
  const userId = req.user._id;

  const answer = await Answer.findById(answerId);
  if (!answer) {
    return next(new ErrorHandler("Answer not found", 404));
  }

  if (answer.downvotes.includes(userId)) {
    return next(new ErrorHandler("You already downvoted this answer", 400));
  }

  answer.upvotes.pull(userId);
  answer.downvotes.push(userId);
  await answer.save();

  res.status(200).json({
    success: true,
    message: "Answer downvoted successfully",
    answer
  });
});

// Remove vote from an answer
export const removeVote = catchAsyncErrors(async (req, res, next) => {
  const answerId = req.params.id;
  const userId = req.user._id;

  const answer = await Answer.findById(answerId);
  if (!answer) {
    return next(new ErrorHandler("Answer not found", 404));
  }

  answer.upvotes.pull(userId);
  answer.downvotes.pull(userId);
  await answer.save();

  res.status(200).json({
    success: true,
    message: "Vote removed successfully",
    answer
  });
});
