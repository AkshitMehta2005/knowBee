import { useContext, useState } from 'react';
import QuestionList from '../components/QuestionList';
import { AuthContext } from '../context/AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  const refreshQuestions = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {user?.role === 'admin' ? 'Welcome, Admin!' : 'Browse Questions'}
      </h1>

      {/* Optional: render something else for admin */}
      {user?.role === 'admin' && (
        <p className="text-blue-600 font-medium mb-6">
          You are logged in as an administrator.
        </p>
      )}

      <QuestionList key={refresh} showControls={false}/>
    </div>
  );
}
