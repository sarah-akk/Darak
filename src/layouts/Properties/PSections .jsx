import { useEffect, useState } from 'react';
import { fetchSections, deleteSection, fetchSectionProperties } from '../../httpService/properties';
import { useAuth } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

const PSections = () => {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getSections = async () => {
      try {
        const sectionsData = await fetchSections(authData.token);
        setSections(sectionsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getSections();
  }, [authData.token]);

  const handleAddClick = () => {
    navigate('/home/add-PSection');
  };

  const handleEditClick = (sectionId) => {
    navigate(`/home/edit-PSection/${sectionId}`);
  };

  const handleDeleteClick = async (sectionId) => {
    try {
      await deleteSection(authData.token, sectionId);
      const updatedSections = sections.filter(section => section.id !== sectionId);
      setSections(updatedSections);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleHover = async (sectionId) => {
    try {
      const sectionProperties = await fetchSectionProperties(authData.token, sectionId);
      navigate(`/home/PSections/properties`, { state: { properties: sectionProperties , sectionId :sectionId } });
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <ClipLoader size={50} color={"#123abc"} loading={loading} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="relative p-4">
      <div className="flex flex-wrap gap-4 mt-8">
        {sections.map((section) => (
          <div
            key={section.id}
            className="border shadow-md shadow-black border-blue-500 rounded-lg p-4 w-80 h-auto text-center relative"
          >
            <img
              src={`https://darak-back.icrcompany.net/${section.image}`}
              alt={section.en_name}
              className="w-full h-auto rounded-lg"
            />
            <div className="mt-4 bg-white">
              <h5 className="text-lg font-bold">{section.en_name}</h5>
              <p className="text-gray-600">{section.ar_name}</p>
            </div>
            <div className="absolute top-2 right-2">
              <button
                className="text-gray-600 hover:text-gray-900"
                onClick={() => handleEditClick(section.id)}
              >
                <AiOutlineEdit
                 />
              </button>
              <button
                className="text-red-600 hover:text-red-900 ml-2"
                onClick={() => handleDeleteClick(section.id)}
              >
                <AiOutlineDelete />
              </button>
            </div>
            <button  className="bg-cyan-800 text-cyan-50 font-semibold p-1 rounded-md m-2 hover:bg-slate-700"
             onClick={() => handleHover(section.id)} >  
             properties 
            </button>
          </div>
        ))}
      </div>
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white font-bold p-5 rounded-full shadow-lg hover:bg-slate-500"
        onClick={handleAddClick}
      >
        <FaPlus />        
      </button>
    </div>
  );
};

export default PSections;
