import axiosInstance from '../config/axios';

const getCharactersByName = async (name: string) => {
  const searchParams = new URLSearchParams({ name });
  const urlParams = name ? `?${searchParams.toString()}` : '';

  const response = await axiosInstance.get(`character${urlParams}`);
  return response.data;
};

export default getCharactersByName;
