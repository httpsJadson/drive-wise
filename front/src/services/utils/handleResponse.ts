export const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    localStorage.removeItem('@DriveWise:token');
    window.location.href = '/login';
    throw new Error('Não autorizado. Faça login.');
  }
  if (!response.ok) throw new Error(`Erro: ${response.statusText}`);
  return response.json();
};