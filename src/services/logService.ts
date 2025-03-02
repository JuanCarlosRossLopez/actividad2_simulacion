import axios, { AxiosError } from 'axios'

class LogService {
  private static instance: LogService
  private baseUrl: string

  private constructor() {
    this.baseUrl = import.meta.env.VITE_LOG_ENDPOINT_API ?? 'http://localhost:3000/logs'
  }

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService()
    }
    return LogService.instance
  }

  public async log(level: 'error' | 'warning' | 'info' | 'debug', message: string, details: any, userId?: string) {
    try {
      await axios.post(
        this.baseUrl,
        {
          level,
          message,
          details,
          timestamp: new Date().toISOString(),
          userId,
        },
        { timeout: 5000 } // Evita que una solicitud bloquee indefinidamente
      )
    } catch (error) {
      const axiosError = error as AxiosError
      console.error('Falló loguear el error:', axiosError.message)

    }
  }
}

export const logService = LogService.getInstance()
