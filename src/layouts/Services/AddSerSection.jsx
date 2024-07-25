// src/components/AddSection.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addServiceSection } from '../../httpService/services';
import { useAuth } from '../../store/AuthContext';
import { ClipLoader } from 'react-spinners';

const AddSerSection = () => {
  const [formData, setFormData] = useState({
    en_name: '',
    ar_name: '',
    en_description: '',
    ar_description: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authData } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      await addServiceSection(authData.token, form);
      navigate('/home/SerSections');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Add New Service Section</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-2/3">
        <div>
          <label className="block text-gray-700">English Name</label>
          <input
            type="text"
            name="en_name"
            value={formData.en_name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Arabic Name</label>
          <input
            type="text"
            name="ar_name"
            value={formData.ar_name}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">English Description</label>
          <textarea
            name="en_description"
            value={formData.en_description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Arabic Description</label>
          <textarea
            name="ar_description"
            value={formData.ar_description}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? <ClipLoader size={20} /> : 'Submit'}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 ml-2"
          onClick={() => navigate('/home/SerSections')}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default AddSerSection;
