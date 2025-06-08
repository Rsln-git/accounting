import axios from '../services/axiosInstance';

export const login = async (useremail, password) => {
  const response = await axios.post(`/auth/login`, { useremail, password });
  const user = response.data.user;

  // зберігаємо користувача в localStorage
  localStorage.setItem("user", JSON.stringify(user));

  return user;
};

export const logout = () => {
  localStorage.removeItem("user");
};
