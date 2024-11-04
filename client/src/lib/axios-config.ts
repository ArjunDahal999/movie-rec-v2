import axios from 'axios';

// this is for the api client without the header
export const apiClientWithoutHeader = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});
