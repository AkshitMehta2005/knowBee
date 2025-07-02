import { useState, useEffect, useContext } from 'react';
import { fetchQuestions, deleteQuestion } from '../services/api';
import Question from './Question';
import { AuthContext } from '../context/AuthContext';

export default function QuestionList({ showControls = true }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const { user } = useContext(AuthContext);

  const fetchQuestionsData = async () => {
    try {
      const response = await fetchQuestions();
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuestion(id);
      fetchQuestionsData(); // Refresh the list after delete
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleEdit = (question) => {
    setEditingQuestion(question);
    // You could redirect to edit page if needed:
    // navigate(`/questions/${question._id}/edit`);
  };

  useEffect(() => {
    fetchQuestionsData();
  }, []);

  if (loading) return <div className="text-center py-6 text-gray-500">Loading questions...</div>;

  return (
    <div>
      {questions.map((question) => (
        <Question
          key={question._id}
          question={question}
          onDelete={handleDelete}
          onEdit={handleEdit}
          showControls={showControls}
        />
      ))}
    </div>
  );
}
