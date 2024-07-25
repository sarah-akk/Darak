import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { addPropertySection } from '../../httpService/properties';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const AddPSection = () => {
  const [enName, setEnName] = useState('');
  const [arName, setArName] = useState('');
  const [enDescription, setEnDescription] = useState('');
  const [arDescription, setArDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData } = useAuth();
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('en_name', enName);
    formData.append('ar_name', arName);
    formData.append('en_description', enDescription);
    formData.append('ar_description', arDescription);
    formData.append('image', image);

    try {
      await addPropertySection(authData.token, formData);
      navigate('/home/PSections');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/home/PSections');
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Property Section</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">English Name</label>
          <input
            type="text"
            value={enName}
            onChange={(e) => setEnName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Arabic Name</label>
          <input
            type="text"
            value={arName}
            onChange={(e) => setArName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">English Description</label>
          <textarea
            value={enDescription}
            onChange={(e) => setEnDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Arabic Description</label>
          <textarea
            value={arDescription}
            onChange={(e) => setArDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="flex items-center justify-center bg-blue-500 text-white rounded-md px-4 py-2"
            disabled={loading}
          >
            {loading ? <AiOutlineLoading3Quarters className="animate-spin mr-2" /> : 'Submit'}
          </button>
          <button
            type="button" 
            className="flex items-center justify-center bg-gray-300 text-gray-700 rounded-md px-4 py-2"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPSection;
