import { getHeaders } from './utils/getHeaders';

const API_BASE_URL = import.meta.env.VITE_API_URL_BASE || 'http://localhost:3000';

let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = []; 

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token as string);
  });
  failedQueue = [];
};

const fetchWithAuth = async <T>(
  endpoint: string, 
  options: RequestInit, 
  requireAuth: boolean
): Promise<T> => {
  
  let response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (response.status === 401 && requireAuth) {

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            refreshToken: localStorage.getItem('@DriveWise:refreshToken')
          })
        });

        if (!refreshResponse.ok) {
          throw new Error('Falha ao renovar token');
        }

        const data = await refreshResponse.json();
        const newToken = data.access_token;

        // 2. Salva o novo token
        localStorage.setItem('@DriveWise:token', newToken);
        if (data.refresh_token) {
          localStorage.setItem('@DriveWise:refreshToken', data.refresh_token);
        }

        // 3. Libera a fila avisando todo mundo que temos um token novo!
        isRefreshing = false;
        processQueue(null, newToken);

        // 4. Refaz a requisição original que tinha falhado
        options.headers = getHeaders(true, newToken);
        response = await fetch(`${API_BASE_URL}${endpoint}`, options);

      } catch (err) {
        // Se o refresh falhar (ex: refresh token também expirou), chuta pro login
        isRefreshing = false;
        processQueue(err as Error, null);
        
        localStorage.removeItem('@DriveWise:token');
        localStorage.removeItem('@DriveWise:refreshToken');
        window.location.href = '/login';
        throw new Error('Sessão totalmente expirada. Refaça o login.');
      }
    } else {
      
      return new Promise<T>(async (resolve, reject) => {
        failedQueue.push({
          resolve: async (newToken: string) => {
            try {
              options.headers = getHeaders(true, newToken);
              const retryResponse = await fetch(`${API_BASE_URL}${endpoint}`, options);
              
              if (!retryResponse.ok) throw new Error(`Erro: ${retryResponse.statusText}`);
              resolve(await retryResponse.json() as T);
            } catch (err) {
              reject(err);
            }
          },
          reject: (err) => reject(err)
        });
      });
    }
  }

  if (!response.ok) {
    throw new Error(`Erro: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
};

export const api = {

  get: async <T>(endpoint: string, requireAuth = false): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      method: 'GET',
      headers: getHeaders(requireAuth)
    }, requireAuth);
  },

  post: async <T>(endpoint: string, body: unknown, requireAuth = false): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      method: 'POST',
      headers: getHeaders(requireAuth),
      body: JSON.stringify(body),
    }, requireAuth);
  },

  patch: async <T>(endpoint: string, body: unknown, requireAuth = true): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      method: 'PATCH',
      headers: getHeaders(requireAuth),
      body: JSON.stringify(body),
    }, requireAuth);
  },

  delete: async <T>(endpoint: string, requireAuth = true): Promise<T> => {
    return fetchWithAuth<T>(endpoint, {
      method: 'DELETE',
      headers: getHeaders(requireAuth),
    }, requireAuth);
  },
}; 