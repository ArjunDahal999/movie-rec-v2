import axios from 'axios';

const baseURL = 'http://192.168.1.234:8000';
const awsURL = 'http://13.60.189.142';
const activeURL = awsURL;
// this is for the api client without the header
export const pythonApiClientWithoutHeader = axios.create({
  baseURL: activeURL,
});
