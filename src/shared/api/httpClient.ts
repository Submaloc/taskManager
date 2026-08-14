const API_BASE_URL = 'http://localhost:3001'

export class HttpError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'HttpError'
    this.status = status
  }
}

export async function httpClient<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const { headers, ...rest } = options ?? {}

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  })

  if (!response.ok) {
    throw new HttpError(
      `Request failed with status ${response.status}`,
      response.status,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  const text = await response.text()

  if (!text) {
    return undefined as T
  }

  return JSON.parse(text) as T
}
