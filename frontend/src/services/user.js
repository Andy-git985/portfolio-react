import axios from 'axios';

const baseUrl = 'http://localhost:3001/auth/login/success';

const getUser = async () => {
  const response = await axios.get(baseUrl);
  return response.user;
};

export default { getUser };
