import axios from 'axios';
import { generateRefreshToken } from '~/services/auth';
import {
  getUserAuthStateFromAsyncStorage,
  storeUserAuthStateIntoAsyncStorage,
} from '~/store/user-auth-store';

const localpythonURL = 'http://192.168.1.234:8000';

export const awsURL = 'http://13.60.189.142';

const nodeURL = 'http://13.61.2.1:4000/api/v1';

const localnodeURL = 'http://192.168.1.234:4000/api/v1';

export const activePythonURL = awsURL;
export const activeNodeURL = localnodeURL;
// this is for the api client without the header
export const pythonApiClientWithoutHeader = axios.create({
  baseURL: activePythonURL,
});

export const nodeApiClientWithoutHeader = axios.create({
  baseURL: activeNodeURL,
});

export const nodeApiClientWithHeader = axios.create({
  baseURL: activeNodeURL,
});

nodeApiClientWithHeader.interceptors.request.use(async (config) => {
  const session = await getUserAuthStateFromAsyncStorage();
  config.headers['Content-Type'] = 'application/json';
  if (session?.data?.accessToken) {
    config.headers.Authorization = `Bearer ${session.data.accessToken}`;
  }
  return config;
});

nodeApiClientWithHeader.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const userState = await getUserAuthStateFromAsyncStorage();
        const resp = await generateRefreshToken(userState.data?.refreshToken!);
        const userAuthState = await storeUserAuthStateIntoAsyncStorage(resp.data!);
        nodeApiClientWithHeader.defaults.headers.common['Authorization'] =
          `Bearer ${resp.data?.accessToken}`;
        return nodeApiClientWithHeader(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
    }
    return Promise.reject(error);
  }
);
