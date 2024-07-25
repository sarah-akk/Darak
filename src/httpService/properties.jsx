
const apiUrl = 'https://darak-back.icrcompany.net/api/v1/admin';

export const fetchSections = async (token) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${apiUrl}/properties-sections`,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
        }
    );
    if (!response.ok) {
      throw new Error('Failed to fetch sections');
    }
    const data = await response.json();
    return data.data.data;
  } catch (error) {
    throw error;
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////


export const addPropertySection = async (token, formData) => {
    const response = await fetch(`${apiUrl}/properties-sections`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add property section');
    }
    return data;
  };

    //////////////////////////////////////////////////////////////////////////////////////////////////////


export const deleteSection = async (token, sectionId) => {
    const url = `${apiUrl}/properties-sections/${sectionId}`;
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete section');
      }
      return true;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  export const updateSection = async (token, sectionId, formData) => {
    const url = `${apiUrl}/properties-sections/${sectionId}`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body:formData
      });
  
      if (!response.ok) {
        throw new Error('Failed to update section');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  
export const fetchSection = async (token, sectionId) => {
    const url = `${apiUrl}/psections/${sectionId}/properties`;
  
    try {
      const response = await fetch(url, {
        headers: {
            'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch section');
      }
      return await response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
 //////////////////////////////////////////////////////////////////////////////////////////////////
 
 export const fetchSectionProperties = async (token, sectionId) => {
  const url = `${apiUrl}/psections/${sectionId}/properties`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch section properties');
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

///////////////////////////////////////////////////////////////////////////////////////

// eslint-disable-next-line no-unused-vars
export const addProperty = async (token, propertyData, sectionId) => {
  console.log(sectionId);
  const API_URL = `${apiUrl}/psections/${sectionId}/properties`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: propertyData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////

export const deleteProperty = async (token, propertyId) => {
  try {
    const response = await fetch(`${apiUrl}/properties/${propertyId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete property');
    }
    return response.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

///////////////////////////////////////////////////////////////////////////////
export const getProperty = async (token, propertyId) => {
  try {
    const response = await fetch(`${apiUrl}/properties/${propertyId}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch property');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

///////////////////////////////////////////////////////////////////////////////


export const updateProperty = async (token,sectionId , propertyId, propertyData) => {
  console.log(sectionId)
  try {
    const response = await fetch(`${apiUrl}/psections/${sectionId}/properties/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: propertyData,
    });
    if (!response.ok) {
      throw new Error('Failed to update property');
    }
    const data = await response.json();
    console.log(data);
    return data; 
  } catch (error) {
    throw new Error(error.message);
  }
};