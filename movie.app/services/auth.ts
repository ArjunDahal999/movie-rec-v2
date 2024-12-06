import axios from 'axios';
import { activeNodeURL, nodeApiClientWithoutHeader } from '~/lib/axios-config';
import { getErrorMessage } from '~/lib/utils/error';
import { ApiResponse, LoginToAccountResponseType } from '~/types';

export const registerAccount = async (
  username: string,
  email: string,
  password: string
): Promise<ApiResponse<any>> => {
  try {
    const { data } = await nodeApiClientWithoutHeader.post('/registerAccount', {
      username,
      email,
      password,
    });
    return {
      success: true,
      message: data.message,
      status: data.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};

export const activateAccount = async (email: string, token: string): Promise<ApiResponse<any>> => {
  try {
    const { data } = await nodeApiClientWithoutHeader.post('/activateAccount', {
      email,
      token,
    });
    return {
      success: true,
      message: data.message,
      status: data.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};

export const loginToAccount = async (
  email: string,
  password: string
): Promise<ApiResponse<LoginToAccountResponseType>> => {
  try {
    const { data } = await nodeApiClientWithoutHeader.post('/loginToAccount', {
      email,
      password,
    });
    return {
      data: data.data,
      success: true,
      message: data.message,
      status: data.status,
    };
  } catch (error: any) {
    return {
      status: error.response.status,
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};

export const generateRefreshToken = async (
  refreshToken: string
): Promise<ApiResponse<LoginToAccountResponseType>> => {
  try {
    const { data } = await nodeApiClientWithoutHeader.post('/refresh', {
      refreshToken,
    });
    return {
      success: true,
      message: data.message,
      status: data.status,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};
