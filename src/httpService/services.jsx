
const API_URL = 'https://darak-back.icrcompany.net/api/v1/admin/';

export const getServiceSections = async (token) => {
  try {
    const response = await fetch(`${API_URL}services-sections`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
        }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch service sections:', error.message);
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////

export const addServiceSection = async (token, formData) => {
    try {
      const response = await fetch(`${API_URL}services-sections`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Failed to add service section');
      }
      return response.json();
    } catch (error) {
      console.error('Failed to add service section:', error.message);
      throw error;
    }
  };

//////////////////////////////////////////////////////////////////////////////////////

export const deleteServiceSection = async (token, id) => {
    try {
      const response = await fetch(`${API_URL}services-sections/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete service section');
      }
      return response.json();
    } catch (error) {
      console.error('Failed to delete service section:', error.message);
      throw error;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////

  export const fetchSectionData = async (authToken, id) => {
    try {
      const response = await fetch(`${API_URL}services-sections/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch section data: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to fetch section data:', error.message);
      throw error;
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////
  
  export const editServiceSection = async (authToken, id, formData) => {
    try {
      const response = await fetch(`${API_URL}services-sections/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to edit service section: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      console.error('Failed to edit service section:', error.message);
      throw error;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////

    export const ExploreServices = async (token , sectionId) => {
    try {
      const response = await fetch(`${API_URL}ser_section/${sectionId}/services`, {
        headers: {
            'Accept': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Failed', error.message);
        throw error;
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////

  export const addService = async (sectionId, formData, authToken) => {
    const form = new FormData();
    form.append('en_name', formData.en_name);
    form.append('ar_name', formData.ar_name);
    form.append('en_description', formData.en_description);
    form.append('ar_description', formData.ar_description);
    form.append('price', formData.price);
    for (let i = 0; i < formData.files.length; i++) {
      form.append('files[]', formData.files[i]);
    }
    const response = await fetch(`${API_URL}ser_sections/${sectionId}/services`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: form,
    });
  
    if (!response.ok) {
      throw new Error('Failed to add service');
    }
  
    return response.json();
  };

  //////////////////////////////////////////////////////////////////////////////////
  export const deleteService = async (token , serviceId) => {
    try {
      const response = await fetch(`${API_URL}services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete service');
      }
  
      return true; 
    } catch (error) {
      console.error('Error deleting service:', error.message);
      throw error;
    }
  };
  //////////////////////////////////////////////////////////////////////////////////////////

  export const updateService = async (token, sectionId, serviceId, serviceData) => {
    const form = new FormData();
    form.append('en_name', serviceData.en_name);
    form.append('ar_name', serviceData.ar_name);
    form.append('en_description', serviceData.en_description);
    form.append('ar_description', serviceData.ar_description);
    form.append('price', serviceData.price);
    form.append('_method', 'PUT');
    if (serviceData.files && serviceData.files.length > 0) { 
      for (let i = 0; i < serviceData.files.length; i++) {
        form.append('files[]', serviceData.files[i]);
      }
    }
  
    try {
      const response = await fetch(`${API_URL}ser_sections/${sectionId}/services/${serviceId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: form,
      });
  
      if (!response.ok) {
        throw new Error('Failed to update service');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating service:', error.message);
      throw error;
    }
  };
