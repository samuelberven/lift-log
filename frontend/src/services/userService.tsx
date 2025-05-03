// usersService.ts
const BASE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USERS_URL = `${BASE_API_URL}/users`;

export const getUser = async (user_id: number) => {
  const response = await fetch(`${USERS_URL}/${user_id}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error fetching user');
  }
  return response.json();
};

export const postUser = async (user: { name: string }) => {
  const response = await fetch(USERS_URL, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error creating user');
  }
  return response.json();
};

// Add update and delete functions as needed...
