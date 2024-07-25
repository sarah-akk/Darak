// services/authService.js

const login = async ({ email, password }) => {
  const response = await fetch('https://darak-back.icrcompany.net/api/v1/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to sign in');
  }

  return response.json();
};

export { login };
