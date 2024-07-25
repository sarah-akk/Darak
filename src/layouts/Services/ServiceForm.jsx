import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Simple Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
  </div>
);

// eslint-disable-next-line react/prop-types
const ServiceForm = ({ isEditMode, onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    en_name: '',
    ar_name: '',
    en_description: '',
    ar_description: '',
    price: '',
    files: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && location.state.service) {
      const { en_name, ar_name, en_description, ar_description, price } = location.state.service;
      setFormData({ en_name, ar_name, en_description, ar_description, price, files: [] });
    }
  }, [isEditMode, location.state]);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        files: e.target.files,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onSubmit(formData);
    setLoading(false);
    navigate('/home/SerSections/service');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{isEditMode ? 'Edit Service' : 'Add New Service'}</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto" encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="en_name" className="block text-lg font-semibold">English Name</label>
          <input
            type="text"
            id="en_name"
            name="en_name"
            value={formData.en_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ar_name" className="block text-lg font-semibold">Arabic Name</label>
          <input
            type="text"
            id="ar_name"
            name="ar_name"
            value={formData.ar_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="en_description" className="block text-lg font-semibold">English Description</label>
          <textarea
            id="en_description"
            name="en_description"
            value={formData.en_description}
            onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="ar_description" className="block text-lg font-semibold">Arabic Description</label>
          <textarea
            id="ar_description"
            name="ar_description"
            value={formData.ar_description}
            onChange={handleChange}
            rows="5"
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-lg font-semibold">Price</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="files" className="block text-lg font-semibold">Upload Image(s)</label>
          <input
            type="file"
            id="files"
            name="files"
            onChange={handleChange}
            multiple
            className="w-full px-3 py-2 border rounded-md mt-1"
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md shadow-md transition-colors ${loading ? 'bg-blue-300 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          disabled={loading}
        >
          {loading ? <Spinner /> : (isEditMode ? 'Update Service' : 'Add Service')}
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
