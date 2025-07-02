import { useState, useContext } from 'react';
import { createQuestion, updateQuestion } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast'; // ✅ Import toast

export default function QuestionForm({ question, setEditing, refreshQuestions }) {
  const [formData, setFormData] = useState({
    title: question?.title || '',
    body: question?.body || '',
  });

  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (question) {
        const res = await updateQuestion(question._id, formData);
        toast.success(res.data.message); // ✅ Show success toast for update
        setEditing(false);
      } else {
        const res = await createQuestion(formData);
        toast.success(res.data.message); // ✅ Show success toast for create
        setFormData({ title: '', body: '' });
      }
      refreshQuestions();
    } catch (error) {
      console.error('Error submitting question:', error);
      toast.error(error?.response?.data?.message || 'Something went wrong'); // ✅ Show error toast
    }
  };

  if (!user) {
    return (
      <p className="text-gray-600 mt-4">
        Please <span className="text-blue-600 font-semibold">log in</span> to ask a question.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto mt-6"
    >
      <h2 className="text-xl font-semibold mb-4">
        {question ? 'Edit Question' : 'Ask a Question'}
      </h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-semibold mb-2">Body</label>
        <textarea
          value={formData.body}
          onChange={(e) => setFormData({ ...formData, body: e.target.value })}
          required
          rows={6}
          className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {question ? 'Update' : 'Post'} Question
        </button>
        {question && (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
