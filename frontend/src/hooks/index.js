import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return {
    fields: { type, value, onChange },
    reset,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    fetchData(baseUrl);
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources(resources.concat(response.data));
    return response.data;
  };

  const remove = async (id) => {
    const response = axios.delete(`${baseUrl}/${id}`);
    const changedResources = resources.filter((resource) => resource.id !== id);
    setResources(changedResources);
    return response.status;
  };

  const service = {
    create,
    remove,
  };

  return [resources, service];
};
