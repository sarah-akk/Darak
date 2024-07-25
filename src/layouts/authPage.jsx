import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../httpService/login';
import { useAuth } from '../store/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const AuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAuthInfo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear any previous errors
    navigate('/home');

    try {
      const data = await login({ email, password });
      console.log('Login success:', data);
      setAuthInfo({
        token: data.data.token,
        name: data.data.user.name,
        email: data.data.user.email,
        password,
      });
      setEmail('');
      setPassword('');

      navigate('/home');
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your email and password and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 max-w-full">
        <div className="flex items-center justify-center mb-6 bg-slate-200 rounded-lg p-1">
          <FontAwesomeIcon icon={faHome} className="text-blue-900 text-3xl mr-2 " />
          <h2 className="text-3xl font-bold text-blue-900">Daraak</h2>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">Forgot your password?</a>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-200"
              disabled={loading}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="w-4 h-4 border-2 border-t-2 border-t-white border-blue-600 rounded-full animate-spin"></div>
                  <span className="ml-2">Signing In...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
};

export default AuthPage;
