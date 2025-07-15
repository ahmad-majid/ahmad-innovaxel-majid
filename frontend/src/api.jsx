import axios from 'axios';

const BASE_API = 'http://localhost:5000/shorten';

export const getAllUrls = async () => {
  const res = await axios.get(`${BASE_API}/`);
  return res.data;
};

export const createShortUrl = async (longUrl) => {
  const res = await axios.post(BASE_API, { url: longUrl });
  return res.data;
};

export const updateUrl = async (code, newUrl) => {
  await axios.put(`${BASE_API}/${code}`, { url: newUrl });
};

export const deleteUrl = async (code) => {
  await axios.delete(`${BASE_API}/${code}`);
};
