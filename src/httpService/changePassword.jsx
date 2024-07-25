export const changePassword = async (token, passwordData) => {
    try {
      const response = await fetch('https://darak-back.icrcompany.net/api/v1/admin/change-password', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
      if (!response.ok) {
        throw new Error('Failed to change password');
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to change password:', error.message);
      throw error;
    }
  };