// src/httpService/contact.js

const API_URL = 'https://darak-back.icrcompany.net/api/v1/admin/';

export const fetchContactInfo = async (token) => {
  try {
    const response = await fetch(`${API_URL}infos`, {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch contact info');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Failed to fetch contact info:', error.message);
    throw error;
  }
};

export const updateContactInfo = async (token, updatedInfo) => {
  try {
    const response = await fetch(`${API_URL}infos`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedInfo),
    });
    if (!response.ok) {
      throw new Error('Failed to update contact info');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to update contact info:', error.message);
    throw error;
  }
};

export const deleteContactInfo = async (token, id) => {
    const response = await fetch(`${API_URL}infos/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete contact info');
    }
  
    const data = await response.json();
    return data;
  };