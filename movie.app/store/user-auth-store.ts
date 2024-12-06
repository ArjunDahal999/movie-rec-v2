import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginToAccountResponseType } from '~/types';

export const USER_STORE_KEY = 'user';
export const ACCESS_TOKEN_STORE_KEY = 'accessToken';
export const REFRESH_TOKEN_STORE_KEY = 'refreshToken';

export const storeUserAuthStateIntoAsyncStorage = async (data: LoginToAccountResponseType) => {
  try {
    const user = JSON.stringify(data.user);
    await AsyncStorage.setItem(USER_STORE_KEY, user);
    await AsyncStorage.setItem(ACCESS_TOKEN_STORE_KEY, data.accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_STORE_KEY, data.refreshToken);
  } catch (e) {
    console.log(e);
  }
};

interface AuthResponse {
  success: boolean;
  message: string;
  data?: LoginToAccountResponseType;
}

export const getUserAuthStateFromAsyncStorage = async (): Promise<AuthResponse> => {
  try {
    const user = await AsyncStorage.getItem(USER_STORE_KEY);
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORE_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_STORE_KEY);

    if (user && accessToken && refreshToken) {
      return {
        data: { user: JSON.parse(user), accessToken, refreshToken },
        message: 'User Found',
        success: true,
      };
    }

    return {
      message: 'No user found',
      success: false,
    };
  } catch (e) {
    return {
      success: false,
      message: 'Error retrieving user data',
    };
  }
};

export const removeUserAuthStateFromAsyncStorage = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    await AsyncStorage.removeItem(USER_STORE_KEY);
    await AsyncStorage.removeItem(ACCESS_TOKEN_STORE_KEY);
    await AsyncStorage.removeItem(REFRESH_TOKEN_STORE_KEY);
    return {
      success: true,
      message: 'Logout Success',
    };
  } catch (e) {
    return {
      success: false,
      message: 'Error',
    };
  }
};
