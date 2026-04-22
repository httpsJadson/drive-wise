const API_BASE_URL = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3000';

export const api = {
  get: async (endpoint: string) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`Erro na comunicação com a API: ${response.statusText}`);
    }
    return response.json();
  },

  post: async (endpoint: string, body: any) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    if (!response.ok) {
      throw new Error(`Erro na comunicação com a API: ${response.statusText}`);
    }
    return response.json();
  }
};