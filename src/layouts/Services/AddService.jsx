// src/components/AddService.js
import { useLocation } from 'react-router-dom';
import { addService } from '../../httpService/services';
import ServiceForm from './ServiceForm';
import { useAuth } from '../../store/AuthContext';

const AddService = () => {
  const location = useLocation();
  const sectionId = location.state.sectionId;
  const { authData } = useAuth();

  const handleAddService = async (serviceData) => {
    await addService(sectionId, serviceData, authData.token);
  };

  return <ServiceForm isEditMode={false} onSubmit={handleAddService} />;
};

export default AddService;
