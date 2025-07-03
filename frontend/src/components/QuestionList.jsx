import { useState, useEffect, useContext } from 'react';
import { fetchQuestions, deleteQuestion } from '../services/api';
import Question from './Question';
import { AuthContext } from '../context/AuthContext';

export default function QuestionList({ showControls = true }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTitle, setSearchTitle] = useState(''); // 🔍 title filter input
  const { user } = useContext(AuthContext);

  const fetchQuestionsData = async (title = '') => {
    try {
      const response = await fetchQuestions(title);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchQuestionsData(searchTitle);
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      fetchQuestionsData(searchTitle); // Keep current filter on delete
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
  };

  useEffect(() => {
    fetchQuestionsData();
  }, []);

  if (loading) return <div className="text-center py-6 text-gray-500">Loading questions...</div>;

  return (
    <div className="p-4">
      {/* 🔍 Filter input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Search
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="text-center text-gray-500">No questions found.</div>
      ) : (
        questions.map((question) => (
          <Question
            key={question._id}
            question={question}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showControls={showControls}
          />
        ))
      )}
    </div>
  );
}
