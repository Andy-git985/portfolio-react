import axios from 'axios';

const baseUrl = '/api/posts';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const response = await axios.post(baseUrl, content);
  return response.data;
};

const updateOrder = async (order) => {
  const response = await axios.put(baseUrl, order);
  return response.data;
};

const removeOne = async (id) => {
  const response = await axios.delete(baseUrl, id);
  return response.status;
};

export default {
  getAll,
  createNew,
  updateOrder,
  removeOne,
};
