// src/components/ServicesLayout.js
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { deleteService } from '../../httpService/services'; 
import { useAuth } from '../../store/AuthContext';

const Services = () => {
  const location = useLocation();
  const { services, sectionId } = location.state;
  const { authData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (services) {
      setLoading(false);
    } else {
      setError('No services data found.');
    }
  }, [services]);

  const handleAddService = (sectionId) => {
    navigate(`/home/SerSections/add-service`, { state: { sectionId } });
  };

  const handleEditService = (service) => {
    navigate(`/home/SerSections/edit-service/${service.id}` , { state: { sectionId, service } });
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(authData.token,serviceId);
      console.log(`Deleted service with ID: ${serviceId}`);
    } catch (error) {
      console.error('Error deleting service:', error.message);
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
      <h2 className="text-2xl font-bold mb-4">Explore Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {services?.map((service) => (
          <div key={service.id} className="bg-white shadow-md rounded-lg p-4 relative">
            <img
              src={`https://darak-back.icrcompany.net/${service.images[0].file}`}
              alt={service.en_name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <h3 className="text-xl font-semibold mt-2">{service.en_name}</h3>
            <p className="text-gray-700">{service.en_description}</p>
            <h3 className="text-xl font-semibold mt-2">{service.ar_name}</h3>
            <p className="text-gray-700">{service.ar_description}</p>
            <p className="text-xl font-semibold mt-2">Price: {service.price}</p>
            <div className="absolute top-2 right-2 flex space-x-2">
              <FaEdit
                className="cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => handleEditService(service)}
              />
              <FaTrash
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => handleDeleteService(service.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors m-10"
        onClick={() => handleAddService({sectionId })}
      >
        Add New Service
      </button>
    </div>
  );
};

export default Services;
