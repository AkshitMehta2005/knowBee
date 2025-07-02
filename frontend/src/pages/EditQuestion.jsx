import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateQuestion, fetchQuestion } from '../services/api';
import toast from 'react-hot-toast'; // ✅ Import toast

export default function EditQuestion() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetchQuestion(id);
        setFormData({
          title: response.data.question.title,
          body: response.data.question.body,
        });
      } catch (error) {
        console.error('Error fetching question:', error);
        toast.error('Failed to fetch question');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestionData();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateQuestion(id, formData);
      toast.success('Question updated successfully'); // ✅ Toast on success
      navigate(`/questions/${id}`);
    } catch (error) {
      console.error('Error updating question:', error);
      toast.error(error?.response?.data?.message || 'Failed to update question'); // ✅ Toast on error
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Loading question...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Question</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Title:</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Body:</label>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            required
            rows={6}
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Question
          </button>
          <button
            type="button"
            onClick={() => navigate(`/questions/${id}`)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
