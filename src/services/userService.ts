import { genericRequest, genericRequestAuthenticated } from '../utils/genericRequest'
import { logService } from './logService'

const base_url = import.meta.env.VITE_ENDPOINT_API ?? 'http://localhost:3000'

const token = localStorage.getItem('token');

const headers = {
  'Content-Type': 'application/json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}), // Solo agrega Authorization si el token existe
};


const handleError = async (error: unknown, context: string) => {
  const errorMessage = `Error during ${context}`
  console.error(errorMessage, error)

  const errorDetails = {
    message: error instanceof Error ? error.message : 'Unknown error',
    response: (error as any)?.response ?? null,
    request: (error as any)?.request ?? null,
  }

  try {
    await logService.log('error', errorMessage, errorDetails)
  } catch (logError) {
    console.error('Failed to log the error:', logError)
  }

  throw error
}

export const LoginService = async (email: string, password: string) => {
  try {
    return await genericRequest(base_url + '/users/login', 'POST', { email, password })
  } catch (error) {
    await handleError(error, 'login')
  }
}



export const RegisterService = async (email: string, password: string) => {
  try {
    return await genericRequest(base_url + '/users/register', 'POST', { email, password })
  } catch (error) {
    await handleError(error, 'registration')
  }
}

export const LogoutService = async () => {
  try {
    return await genericRequestAuthenticated(headers, base_url + "/users/logout", "POST");
  } catch (error) {
    await handleError(error, "logout");
  }
};




