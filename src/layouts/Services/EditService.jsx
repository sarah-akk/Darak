// src/components/EditService.js
import { useLocation } from 'react-router-dom';
import { updateService } from '../../httpService/services';
import ServiceForm from './ServiceForm';
import { useAuth } from '../../store/AuthContext';

const EditService = () => {
  const location = useLocation();
  const { sectionId, service } = location.state;
  const { authData } = useAuth();

  const handleUpdateService = async (serviceData) => {
    await updateService(authData.token, sectionId, service.id, serviceData);
  };

  return <ServiceForm isEditMode={true} onSubmit={handleUpdateService} />;
};

export default EditService;
