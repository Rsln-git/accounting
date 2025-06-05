import axios from '../services/axiosInstance';

// const API_URL = 'http://localhost:3000/auth';

export const login = async (useremail, password) => {
  const response = await axios.post(`/auth/login`, { useremail, password });
  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  }
  return response.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');
  await axios.post(
    `/auth/logout`,
    { refreshToken },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post(`/auth/refresh`, { refreshToken });
  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  }
  return response.data;
};
