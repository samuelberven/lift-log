// services/user-api.ts
import { User, CreateUserDto, UpdateUserDto } from '../types/user';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const UserApi = {
  async getById(id: number): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to fetch user ${id}`);
    }
    return response.json();
  },

  async create(userData: CreateUserDto): Promise<User> {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: userData })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to create user');
    }
    return response.json();
  },

  async update(id: number, userData: UpdateUserDto): Promise<User> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user: userData })
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to update user ${id}`);
    }
    return response.json();
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || `Failed to delete user ${id}`);
    }
  }
};
