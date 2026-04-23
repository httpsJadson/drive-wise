export const getHeaders = (requireAuth: boolean, customToken?: string): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requireAuth) {
    const token = customToken || localStorage.getItem('@DriveWise:token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};