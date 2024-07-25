// src/layouts/Profile.jsx

import { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { changePassword } from '../../httpService/changePassword';
// eslint-disable-next-line no-unused-vars
import { FaUserCircle, FaLock } from 'react-icons/fa';

const Profile = () => {
  const { authData } = useAuth();
  const [passwordData, setPasswordData] = useState({
    old_password: '',
    password: '',
    password_confirmation: ''
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await changePassword(authData.token, passwordData);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex items-center justify-center mb-4">
          <FaUserCircle className="text-6xl text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-700">Profile</h2>
        <div className="text-center text-gray-500">Manage your profile and change your password</div>
        {message && (
          <div className={`p-2 rounded text-center ${message.type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Current Password</label>
            <input
              type="password"
              name="old_password"
              value={passwordData.old_password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={passwordData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="password_confirmation"
              value={passwordData.password_confirmation}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Changing Password...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
