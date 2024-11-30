import axios from 'axios';

const baseURL = 'http://192.168.1.234:8000';
const awsURL = 'http://13.49.18.64';

const activeURL = baseURL;
// this is for the api client without the header
export const pythonApiClientWithoutHeader = axios.create({
  baseURL: activeURL,
});
