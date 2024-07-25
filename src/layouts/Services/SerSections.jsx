// src/components/SerSections.js
import { useState, useEffect } from 'react';
import { getServiceSections, deleteServiceSection , ExploreServices } from '../../httpService/services';
import { useAuth } from '../../store/AuthContext';
import { ClipLoader } from 'react-spinners';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SerSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authData } = useAuth();
  const navigate = useNavigate();
  

  useEffect(() => {
    async function fetchSections() {
      try {
        const data = await getServiceSections(authData.token);
        setSections(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSections();
  }, [authData.token]);

  const handleAddSection = () => {
    navigate('/home/add-SerSection');
  };

  const handleEditSection = (id) => {
    navigate(`/home/edit-SerSection/${id}`);
  };

  const handleDeleteSection = async (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        await deleteServiceSection(authData.token, id);
        setSections(sections.filter((section) => section.id !== id));
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleExploreServices = async (sectionId) => {
    try {
    const data = await ExploreServices(authData.token,sectionId);
    
    navigate('/home/SerSections/services', { state: { services: data.data  , sectionId : sectionId} });
    } catch (error) {
      setError(error.message);
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
    <div className="container mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Service Sections</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div key={section.id} className="bg-white shadow-md rounded-lg p-4 relative">
            <img
              src={`https://darak-back.icrcompany.net/${section.image}`}
              alt={section.en_name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{section.en_name}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: section.en_description }}></p>
            <h3 className="text-xl font-semibold mt-2">{section.ar_name}</h3>
            <p className="text-gray-700" dangerouslySetInnerHTML={{ __html: section.ar_description }}></p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <FaEdit
                className="text-blue-500 cursor-pointer"
                onClick={() => handleEditSection(section.id)}
              />
              <FaTrash
                className="text-red-500 cursor-pointer"
                onClick={() => handleDeleteSection(section.id)}
              />
            </div>
            <button
                className="text-blue-700 cursor-pointer focus:outline-none m-5"
                onClick={() => handleExploreServices(section.id)}
              >
               Explore Services
              </button>
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
        onClick={handleAddSection}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default SerSections;
