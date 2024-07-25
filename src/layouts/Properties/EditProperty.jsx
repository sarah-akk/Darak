/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { getProperty, updateProperty } from '../../httpService/properties';

const EditProperty = () => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { sectionId, propertyId } = location.state;
  const [formData, setFormData] = useState({
    en_name: '',
    ar_name: '',
    en_description: '',
    ar_description: '',
    total_price: '',
    number: '',
    area: '',
    address: '',
    files: null,
    is_best: false,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchProperty() {
      try {
        const property = await getProperty(authData.token, propertyId);
        setFormData({
          en_name: property.en_name,
          ar_name: property.ar_name,
          en_description: property.en_description,
          ar_description: property.ar_description,
          total_price: property.total_price,
          number: property.number,
          area: property.area,
          address: property.address,
          is_best: property.is_best,
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch property:', error.message);
        setLoading(false); 
      }
    }

    fetchProperty();
  }, [authData.token, propertyId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, files: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const propertyData = new FormData();
    for (const key in formData) {
      if (key === 'files') {
        Array.from(formData[key]).forEach((file) => {
          propertyData.append('files[]', file);
        });
      } else if (key === 'is_best') {
        propertyData.append(key, formData[key].toString());
      } else {
        propertyData.append(key, formData[key]);
      }
    }

    try {
      await updateProperty(authData.token, sectionId, propertyId, propertyData);
      navigate('/home/PSections/properties');
    } catch (error) {
      console.error('Failed to update property:', error.message);
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="visually-hidden"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <label className="block text-gray-700">Total Price</label>
          <input
            type="number"
            name="total_price"
            value={formData.total_price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Number</label>
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Area</label>
          <input
            type="text"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            name="files"
            multiple
            onChange={handleFileChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Is Best Property</label>
          <input
            type="checkbox"
            name="is_best"
            checked={formData.is_best}
            onChange={handleChange}
            className="w-6 h-6"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          disabled={submitting}
        >
          {submitting ? (
            <div className="flex items-center">
              <div className="spinner-border animate-spin inline-block w-4 h-4 border-2 rounded-full mr-2" role="status">
                <span className="visually-hidden"></span>
              </div>
              Submitting...
            </div>
          ) : (
            'Submit'
          )}
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 ml-2"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
