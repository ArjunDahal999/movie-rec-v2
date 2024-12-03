import axios from 'axios';

const baseURL = 'http://192.168.1.234:8000';
export const awsURL = 'http://13.60.189.142';
export const activePythonURL = awsURL;
// this is for the api client without the header
export const pythonApiClientWithoutHeader = axios.create({
  baseURL: activePythonURL,
});
