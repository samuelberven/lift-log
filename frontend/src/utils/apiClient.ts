export async function apiRequest<T>(endpoint: string, options: RequestInit): Promise<T> {
  const response = await fetch(endpoint, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'An error occurred during the API request.');
  }
  return response.json() as Promise<T>;
}
