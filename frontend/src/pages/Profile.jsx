import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profile() {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600 text-lg">
        Please <span className="text-blue-600 font-semibold">log in</span> to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
      <div className="space-y-4 text-gray-700">
        <p><span className="font-semibold">Username:</span> {user.username}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
      </div>
    </div>
  );
}
