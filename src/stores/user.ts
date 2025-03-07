import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { LoginService, RegisterService, LogoutService } from '@/services/userService'
import { useStorage } from '@vueuse/core'
import { logService } from '@/services/logService'

import type { User } from '@/interfaces/User'

export const useAuthStore = defineStore('auth', () => {
  const user = ref({} as User)
  const token = useStorage('token', '')
  const errorMessage = ref('') // Para almacenar el mensaje de error
  const isLoggedIn = computed(() => token.value !== '' && token.value !== undefined)

  const handleAuthError = async (error: unknown, context: string, extraDetails = {}) => {
    const errorDetails = {
      message: error instanceof Error ? error.message : 'Unknown error',
      ...extraDetails,
    }

    errorMessage.value = errorDetails.message // Guardamos el mensaje de error

    try {
      await logService.log('error', `Error during ${context}`, errorDetails)
    } catch (logError) {
      console.error('Failed to log the error:', logError)
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await LoginService(email, password)
      if (response && response.status === 200 && response.data && response.data.token) {
        user.value = response.data
        token.value = user.value.token
        errorMessage.value = ''
        console.log('Login exitoso:', response)
      } else {
        errorMessage.value = 'Error en el inicio de sesión: Respuesta inválida'
        console.error('Respuesta inválida:', response)
      }
    } catch (error) {
      errorMessage.value = 'Error en el inicio de sesión: Ocurrió un problema.'
      console.error('Error durante el login:', error)
      await handleAuthError(error, 'login', { email })
    }
  }

  async function register(email: string, password: string) {
    try {
      const response = await RegisterService(email, password)
      if (response.status === 200) {
        user.value = response.data
        token.value = user.value.token
        errorMessage.value = '' // Limpiamos el error si el registro es exitoso
      }
    } catch (error) {
      await handleAuthError(error, 'registration', { email })
    }
  }

  async function logout() {
    try {
      const response = await LogoutService()

      console.log('Logout response en store:', response) // Ahora debería mostrar el mensaje

      // Si el backend responde con éxito, limpiar datos del usuario
      user.value = {} as User
      token.value = ''
      localStorage.removeItem('token') // Asegúrate de borrar el token

      console.log('Sesión cerrada correctamente')
    } catch (error: any) {
      console.error('Error durante el logout', error)
      await logService.log('error', 'Error durante el logout', { error })
    }
  }

  return { login, register, logout, isLoggedIn, token, errorMessage }
})
