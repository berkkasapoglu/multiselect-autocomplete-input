import axios from 'axios';
import axiosInstance from '../config/axios';

const getCharacters = async () => {
  const response = await axiosInstance.get('character');
  return response.data;
};

export default getCharacters;
