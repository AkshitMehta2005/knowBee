import { useState, useContext } from 'react';
import { createAnswer } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AnswerForm({ questionId, refreshAnswers }) {
  const [body, setBody] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createAnswer({ questionId, body });
      toast.success(res.data.message);
      setBody('');
      refreshAnswers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error submitting answer');
      console.error('Error submitting answer:', error);
    }
  };

  if (!user) {
    return (
      <p className="text-purple-700 mt-4 text-center">
        You must be <span className="text-purple-900 font-semibold">logged in</span> to post an answer.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mt-6 border border-purple-200">
      <div className="mb-4">
        <label className="block text-purple-800 font-semibold mb-3">Your Answer:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
          className="w-full border border-purple-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          rows={5}
          placeholder="Write your answer here..."
        />
      </div>
      <button
        type="submit"
        className="bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition font-medium"
      >
        Post Answer
      </button>
    </form>
  );
}