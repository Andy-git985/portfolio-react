import axios from 'axios';
const baseUrl = '/api/posts';
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, content, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
};

const updateOrder = async (order) => {
  const config = {
    headers: {
      Authorization: token,
      'Cache-Control': 'public',
      'max-age': '86400',
    },
  };

  const response = await axios.put(baseUrl, order, config);
  return response.data;
};

const removeOne = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default {
  getAll,
  createNew,
  update,
  updateOrder,
  removeOne,
  setToken,
};
