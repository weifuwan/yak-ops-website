export type ApiResponse<T> = {
  code: number;
  message?: string;
  data?: T;
};

export class ApiError extends Error {
  status: number;
  code?: number;

  constructor(message: string, status: number, code?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...init.headers,
    },
  });

  const envelope = (await response.json().catch(() => null)) as ApiResponse<T> | null;
  const message = envelope?.message || (response.ok ? '请求失败' : `请求失败 (${response.status})`);

  if (!response.ok || !envelope || envelope.code !== 200) {
    throw new ApiError(message, response.status, envelope?.code);
  }

  return envelope.data as T;
}

export function postJson<T>(path: string, body?: unknown): Promise<T> {
  return apiRequest<T>(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

/**
 * Read a public JSON endpoint without the credentials or response envelope
 * used by Yak Ops backend APIs.
 */
export async function getPublicJson<T>(url: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Public API request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}
