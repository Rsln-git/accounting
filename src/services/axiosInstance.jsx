import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(
  (config) => {
    const apiKey = "your-secure-api-key"; // або process.env.REACT_APP_API_KEY, залежно від вашого оточення
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
