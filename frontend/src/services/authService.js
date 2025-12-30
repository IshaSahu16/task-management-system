import axios from '../utils/axios';

const register = async (userData) => {
  const response = await axios.post('/api/auth/register', userData);
  return response.data; 
};

const login = async (credentials) => {
  const response = await axios.post('/api/auth/login', credentials);

  if (response.data?.data?.token) {
    localStorage.setItem('token', response.data.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getAllUsers = async () => {
  const response = await axios.get('/api/auth/users');
  return response.data;
};

const deleteUser = async (userId) => {
  const response = await axios.delete(`/api/auth/users/${userId}`);
  return response.data;
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getAllUsers,
  deleteUser,
};
