const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:3001'
).replace(/\/$/, '')

export class HttpError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof HttpError && error.status === 404
}

export function getErrorMessage(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  if (error instanceof Error && error.message) {
    return error.message
  }

  return fallback
}

function messageForStatus(status: number): string {
  if (status === 404) {
    return 'The requested resource was not found.'
  }

  if (status >= 500) {
    return 'The server could not complete the request.'
  }

  return 'The request failed. Please try again.'
}

export async function httpClient<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const { headers, ...rest } = options ?? {}

  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  } catch {
    throw new HttpError(
      'Could not connect to the server. Make sure the API is running.',
      0,
    )
  }

  if (!response.ok) {
    throw new HttpError(messageForStatus(response.status), response.status)
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()

  if (!text) {
    return undefined as T
  }

  try {
    return JSON.parse(text) as T
  } catch {
    throw new HttpError('Received invalid data from the server.', 500)
  }
}
