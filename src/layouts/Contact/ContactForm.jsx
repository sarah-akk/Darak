// src/components/ContactForm.jsx

import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ContactForm = ({ initialData, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(initialData || { key: '', value: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Contact Info</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="key" className="block text-lg font-semibold">Key</label>
            <input
              type="text"
              id="key"
              name="key"
              value={formData.key}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="value" className="block text-lg font-semibold">Value</label>
            <input
              type="text"
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md mt-1"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
