import axios from 'axios';
import { activeNodeURL, nodeApiClientWithoutHeader } from '~/lib/axios-config';
import { getErrorMessage } from '~/lib/utils/error';
import { ApiResponse } from '~/types';

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
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response.data.message || getErrorMessage(error),
    };
  }
};
