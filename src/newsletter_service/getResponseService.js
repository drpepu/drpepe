import axios from 'axios';

const API_URL = 'https://getresponse-proxy.vercel.app/'; 

export const addSubscriber = async (listId, email, name) => {
  try {
    const response = await axios.post(API_URL, { listId, email, name });
    return response.data;
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw error;
  }
};
