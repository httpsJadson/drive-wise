import { getHeaders } from './utils/getHeaders';
import { handleResponse } from './utils/handleResponse';

const API_URL = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3000';

export const authService = {
  /**
   * Realiza a autenticação do usuário.
   * Em caso de sucesso, armazena o token no localStorage conforme esperado pelo handleResponse.
   */
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(false),
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    if (data && data.access_token) {
      localStorage.setItem('@DriveWise:token', data.access_token);
      if (data.refresh_token) {
        localStorage.setItem('@DriveWise:refreshToken', data.refresh_token);
      }
    }

    return data;
  },

  logout: () => {
    localStorage.removeItem('@DriveWise:token');
    localStorage.removeItem('@DriveWise:refreshToken');
    window.location.href = '/login';
  },
};