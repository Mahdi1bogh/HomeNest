import { useEffect, useState } from 'react';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseUrl: 'https://real-states.herokuapp.com',
});
export const axiosClient = axios.create();

axiosClient.defaults.headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const useFetchData = (url = '', token = '') => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axiosInstance.get(url);
        setData(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [url, token]);

  return {
    data,
    loading,
  };
};

export default useFetchData;

export async function postRequest(URL, payload, token) {
  const response = await axiosInstance.post(`${URL}`, payload);
  return response;
}

export async function patchRequest(URL, payload, token) {
  if (token)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axiosInstance.patch(`${URL}`, payload);
  return response;
}

export async function deleteRequest(URL, token) {
  if (token)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  const response = await axiosInstance.delete(`${URL}`);
  return response;
}
