import axios from 'axios';

// this is for the api client without the header
export const pythonApiClientWithoutHeader = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PYTHON_API_BASE_URL,
});

export const nodeApiClientWithoutHeader = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_NODE_API_BASE_URL}/api/v1`,
});

export const nodeApiClientWithHeader = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NODE_API_BASE_URL,
});
