import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {
  upvoteAnswer,
  downvoteAnswer,
  removeVote,
  deleteAnswer,
  updateAnswer
} from '../services/api';
import toast from 'react-hot-toast';

export default function Answer({ answer, refreshAnswers }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editBody, setEditBody] = useState(answer.body);
  const { user } = useContext(AuthContext);

  const handleVote = async (type) => {
    try {
      if (type === 'upvote') {
        const res = await upvoteAnswer(answer._id);
        toast.success(res.data.message);
      } else if (type === 'downvote') {
        const res = await downvoteAnswer(answer._id);
        toast.success(res.data.message);
      } else {
        const res = await removeVote(answer._id);
        toast.success(res.data.message);
      }
      refreshAnswers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Voting failed');
      console.error('Voting error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await deleteAnswer(answer._id);
      toast.success(res.data.message);
      refreshAnswers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Delete failed');
      console.error('Delete error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await updateAnswer(answer._id, { body: editBody });
      toast.success(res.data.message);
      setIsEditing(false);
      refreshAnswers();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Update failed');
      console.error('Update error:', error);
    }
  };

  const userUpvoted = user && answer.upvotes.includes(user._id);
  const userDownvoted = user && answer.downvotes.includes(user._id);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-purple-200">
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            className="w-full border border-purple-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            rows="4"
          />
          <div className="space-x-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-purple-900 text-lg mb-2">{answer.body}</p>
          <p className="text-sm text-purple-600 mb-3">
            Posted by: <span className="font-medium">{answer.user?.username}</span>
          </p>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-semibold text-purple-700">
              Votes: {answer.upvotes.length - answer.downvotes.length}
            </span>
            {user && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleVote('upvote')}
                  disabled={userUpvoted}
                  className={`px-3 py-1 rounded-lg ${
                    userUpvoted
                      ? 'bg-purple-300 text-purple-800 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } transition`}
                >
                  Upvote
                </button>
                <button
                  onClick={() => handleVote('downvote')}
                  disabled={userDownvoted}
                  className={`px-3 py-1 rounded-lg ${
                    userDownvoted
                      ? 'bg-purple-300 text-purple-800 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                  } transition`}
                >
                  Downvote
                </button>
                {(userUpvoted || userDownvoted) && (
                  <button
                    onClick={() => handleVote('remove')}
                    className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg transition"
                  >
                    Remove Vote
                  </button>
                )}
              </div>
            )}
          </div>
          {user?._id === answer.user?._id && (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}