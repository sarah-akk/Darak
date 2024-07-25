/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight, AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { deleteProperty } from '../../httpService/properties';
import { useAuth } from '../../store/AuthContext';
import { FaPlus } from 'react-icons/fa';
import staticPhotoURL from "../../assets/house2.jpg"

const Properties = () => {
  const location = useLocation();
  const { properties, sectionId } = location.state || { properties: { data: [] }, sectionId: null };
  const navigate = useNavigate();
  const { authData } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  const handleNextImage = (propertyId, imagesLength) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [propertyId]: (prevIndex[propertyId] + 1) % imagesLength,
    }));
  };

  const handlePrevImage = (propertyId, imagesLength) => {
    setCurrentImageIndex((prevIndex) => ({
      ...prevIndex,
      [propertyId]: (prevIndex[propertyId] - 1 + imagesLength) % imagesLength,
    }));
  };

  const handleAddProperty = () => {
    navigate('/home/PSections/properties/add-property', { state: { sectionId } });
  };

  const handleDeleteProperty = async (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await deleteProperty(authData.token, propertyId);
        setCurrentImageIndex((prevIndex) => {
          const updatedIndex = { ...prevIndex };
          delete updatedIndex[propertyId];
          return updatedIndex;
        });
      } catch (error) {
        console.error('Failed to delete property:', error.message);
      }
    }
  };

  const handleEditProperty = (propertyId) => {
    navigate('/home/PSections/properties/edit-property', { state: { sectionId, propertyId } });
  };


  return (
    <div className="relative p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Section Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.data.map((property) => {
          const currentImageIdx = currentImageIndex[property.id] || 0;
          const imagesLength = property.images.length;
          return (
            <div
              key={property.id}
              className="border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 relative"
            >
              <img
                src={staticPhotoURL}
                alt={property.en_name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex justify-between items-center p-2 mb-10">
                <button
                  className="text-white bg-black bg-opacity-50 rounded-full p-2"
                  onClick={() => handlePrevImage(property.id, imagesLength)}
                >
                  <AiOutlineLeft size={20} />
                </button>
                <button
                  className="text-white bg-black bg-opacity-50 rounded-full p-2"
                  onClick={() => handleNextImage(property.id, imagesLength)}
                >
                  <AiOutlineRight size={20} />
                </button>
              </div>
              <div className="p-4">
                <h5 className="text-xl font-bold mb-2 text-gray-800">{property.en_name}</h5>
                <p className="text-gray-600 mb-2">{property.ar_name}</p>
                <p className="text-gray-800 font-semibold mb-2">Price: ${property.total_price}</p>
                <p className="text-gray-600 mb-2">Address: {property.address}</p>
                <p className="text-gray-600 mb-2">Area: {property.area}</p>
                <p className="text-gray-600 mb-2">{property.is_best ? "Best Property" : ""}</p>
              </div>
              <button
                className="absolute button-2 right-2 text-red-500 hover:text-red-700"
                onClick={() => handleDeleteProperty(property.id)}
              >
                <AiOutlineDelete size={30} />
              </button>
              <button
                className="text-blue-500 hover:text-blue-700 ml-2"
                onClick={() => handleEditProperty(property.id)}
              >
                <AiOutlineEdit size={30} />
              </button>
            </div>
          );
        })}
      </div>
      <button
        className="fixed bottom-8 right-8 bg-blue-500 text-white font-bold p-8 rounded-full shadow-lg hover:bg-blue-700"
        onClick={handleAddProperty}
      >
        <FaPlus />
      </button>
      <button
        className="fixed bottom-8 left-30 bg-gray-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-gray-700"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
    </div>
  );
};

export default Properties;
