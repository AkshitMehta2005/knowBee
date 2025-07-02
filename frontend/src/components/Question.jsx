import { useNavigate } from 'react-router-dom';

export default function Question({ question, onEdit, onDelete, showControls = false }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2
        className="text-lg font-semibold text-blue-600 cursor-pointer hover:underline"
        onClick={() => navigate(`/questions/${question._id}`)}
      >
        {question.title}
      </h2>
      <p className="text-gray-700">{question.body}</p>
      <p className="text-sm text-gray-500 mt-1">
        Asked by: <span className="font-semibold">{question.user?.username}</span>
      </p>
      <p className="text-sm text-gray-500">Answers: {question.answers?.length || 0}</p>

      {showControls && (
        <div className="mt-3 space-x-2">
          <button
            onClick={() => onEdit?.(question)}
            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete?.(question._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
