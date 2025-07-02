import mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: [true, "Answer body is required"],
    trim: true,
    minlength: [10, "Answer must be at least 10 characters long"],
    maxlength: [5000, "Answer cannot exceed 5000 characters"]
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isAccepted: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true } 
});

// Add virtual for vote score
answerSchema.virtual('voteScore').get(function() {
  return this.upvotes.length - this.downvotes.length;
});

// Add index for better performance on frequent queries
answerSchema.index({ question: 1, createdAt: -1 });
answerSchema.index({ user: 1 });

export default mongoose.model('Answer', answerSchema);