// src/components/EditSerSection.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { ClipLoader } from 'react-spinners';
import { editServiceSection, fetchSectionData } from '../../httpService/services';
import { useNavigate } from 'react-router-dom';

const EditSerSection = () => {
  const { id } = useParams();
  const { authData } = useAuth();
  const navigate = useNavigate();

  const [sectionData, setSectionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false); 

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchSectionData(authData.token, id);
        setSectionData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [authData.token, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      setSubmitting(true); 
      await editServiceSection(authData.token, id, formData);
      navigate('/home/SerSections');
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false); 
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Service Section</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="en_name" className="block text-lg font-semibold">English Name</label>
          <input
            type="text"
            id="en_name"
            name="en_name"
            defaultValue={sectionData.en_name}
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
            defaultValue={sectionData.ar_name}
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="en_description" className="block text-lg font-semibold">English Description</label>
          <textarea
            id="en_description"
            name="en_description"
            defaultValue={sectionData.en_description}
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
            defaultValue={sectionData.ar_description}
            rows="5"
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-semibold">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            defaultValue={`https://darak-back.icrcompany.net/${sectionData.image}`}
            className="w-full px-3 py-2 border rounded-md mt-1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
          disabled={submitting} 
        >
          {submitting ? <ClipLoader size={20} color="#ffffff" /> : 'Update Section'}
        </button>
      </form>
    </div>
  );
};

export default EditSerSection;
