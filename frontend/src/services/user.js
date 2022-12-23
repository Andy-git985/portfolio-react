import axios from 'axios';

const getToken = (key) => {
  let value = '';
  document.cookie.split(';').forEach((e) => {
    if (e.includes(key)) {
      value = e.split('=')[1];
    }
  });
  return value;
};

const requestInstance = axios.create({
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});

const getUser = async () => {
  const baseUrl = 'http://localhost:3001/auth/login/success';
  const response = await requestInstance.get(baseUrl);
  return response.data;
};

const logout = async () => {
  const baseUrl = 'http://localhost:3001/auth/logout';
  const response = await axios.get(baseUrl);
  return response.status;
};

export default { getUser, logout, getToken };
