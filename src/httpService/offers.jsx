const apiUrl = 'https://darak-back.icrcompany.net/api/v1/admin';

export const fetchOffers = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/offers`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch offers');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching offers:', error);
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////////////

export const addOffer = async (token, formData) => {
  try {
   const response = await fetch(`${apiUrl}/offers`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    const data = response.json();
    return data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Failed to add offer');
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const deleteOffer = async (token, offerId) => {
  try {
    const response = await fetch(`${apiUrl}/offers/${offerId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete offer');
    }

    return response.json();
  } catch (error) {
    console.error('Error deleting offer:', error);
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////////////////

export const getOffer = async (token, offerId) => {
  try {
    const response = await fetch(`${apiUrl}/offers/${offerId}`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      }}
    );
       if (!response.ok) {
      throw new Error('Failed to fetch offer');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching offer:', error);
    throw error;
  }
};

///////////////////////////////////////////////////////////////////////////////////////

export const updateOffer = async (token, offerId, formData) => {
  
  try {
    const response = await fetch(`${apiUrl}/offers/${offerId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Failed to update offer');
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error updating offer:', error);
    throw error;
  }
};
