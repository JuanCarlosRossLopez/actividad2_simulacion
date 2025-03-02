import axios from 'axios'
import { logService } from '@/services/logService'

export const genericRequest = async (url: string, method: string, body?: any) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });

    console.log("Respuesta completa de axios:", response); // Registra la respuesta completa

    return response; // Devuelve la respuesta completa, no solo `data`
  } catch (error: any) {
    await logService.log('error', `Error in genericRequest: ${error.message}`, {
      url,
      method,
      body,
      error,
    });

    throw error;
  }
}



export const genericRequestAuthenticated = async (
  headers: any,
  url: string,
  method: string,
  body?: any,
) => {
  try {
    const response = await axios({
      url: url,
      method: method,
      headers: headers,
      data: body,
    })
    return response.data
  } catch (error: any) {
    await logService.log('error', `Error in genericRequestAutheticated: ${error.message}`, {
      url,
      method,
      body,
      headers,
      error,
    })
    throw error
  }
}
