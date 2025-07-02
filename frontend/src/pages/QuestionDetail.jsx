import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestion, deleteQuestion } from '../services/api';
import Answer from '../components/Answer';
import AnswerForm from '../components/AnswerForm';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast'; // ✅ toast import

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchQuestionData = async () => {
    try {
      const response = await fetchQuestion(id);
      setQuestion(response.data.question);
    } catch (error) {
      console.error('Error fetching question:', error);
      toast.error('Failed to fetch question');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuestion(id);
      toast.success('Question deleted successfully'); // ✅ Success toast
      navigate('/');
    } catch (error) {
      console.error('Error deleting question:', error);
      toast.error('Failed to delete question'); // ✅ Error toast
    }
  };

  useEffect(() => {
    fetchQuestionData();
  }, [id]);

  if (loading)
    return <div className="text-center py-10 text-gray-600 text-lg">Loading...</div>;

  if (!question)
    return <div className="text-center py-10 text-red-500 text-lg">Question not found</div>;

  const isAuthor = user && question.user._id === user._id;
  const isAdmin = user && user.role === 'admin';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{question.title}</h1>
        <p className="text-gray-700 mb-4">{question.body}</p>
        <p className="text-sm text-gray-500">
          Asked by: <span className="font-medium">{question.user?.username}</span>
        </p>

        {(isAuthor || isAdmin) && (
          <div className="mt-4 space-x-2">
            <button
              onClick={() => navigate(`/questions/${id}/edit`)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Edit Question
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Delete Question
            </button>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Answers ({question.answers?.length || 0})
        </h2>
        {user && (
          <AnswerForm
            questionId={id}
            refreshAnswers={fetchQuestionData}
          />
        )}
      </div>

      <div className="space-y-4">
        {question.answers?.map((answer) => (
          <Answer
            key={answer._id}
            answer={answer}
            refreshAnswers={fetchQuestionData}
          />
        ))}
      </div>
    </div>
  );
}
