interface ApiError extends Error {
  status?: number;
  statusText?: string;
}

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = new Error(await response.text()) as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    return response.json() as Promise<T>;
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = new Error(await response.text()) as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    return response.json() as Promise<T>;
  },

  put: async <T>(endpoint: string, data: any): Promise<T> => {
    const response = await fetch(endpoint, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = new Error(await response.text()) as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    return response.json() as Promise<T>;
  },

  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = new Error(await response.text()) as ApiError;
      error.status = response.status;
      error.statusText = response.statusText;
      throw error;
    }

    return response.json() as Promise<T>;
  }
};