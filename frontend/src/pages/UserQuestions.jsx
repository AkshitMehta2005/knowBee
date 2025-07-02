import { useState, useEffect, useContext } from 'react';
import { fetchQuestions } from '../services/api';
import Question from '../components/Question';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function UserQuestions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserQuestions = async () => {
      try {
        const response = await fetchQuestions();
        const userQuestions = response.data.questions.filter(
          q => q.user._id === user?._id
        );
        setQuestions(userQuestions);
        if (userQuestions.length === 0) {
          toast('No questions found');
        }
      } catch (error) {
        console.error('Error fetching user questions:', error);
        toast.error('Failed to load your questions');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      getUserQuestions();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading your questions...</div>;
  if (!user) return <div>Please log in to view your questions</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your Questions</h1>
      {questions.length === 0 ? (
        <p>You haven't asked any questions yet.</p>
      ) : (
        questions.map((question) => (
          <Question
            key={question._id}
            question={question}
            showControls={false}
          />
        ))
      )}
    </div>
  );
}
