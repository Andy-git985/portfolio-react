import axios from 'axios';

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
  return response.data.user;
};

const logout = async () => {
  const baseUrl = 'http://localhost:3001/auth/logout';
  const response = await axios.get(baseUrl);
  return response.status;
};

export default { getUser, logout };
