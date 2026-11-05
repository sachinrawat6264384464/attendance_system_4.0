export const getApiUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  if (typeof window !== 'undefined' && window.location.hostname.includes('vercel.app')) {
    return 'https://attendance-system-4-0-15mw.vercel.app/api/v1';
  }
  return 'http://localhost:5000/api/v1';
};

export const API_URL = getApiUrl();

export interface ApiResponse<T = any> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta?: {
    page?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
  };
}

export async function apiClient<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('apex_token') : null;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const baseUrl = getApiUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include', // Includes HTTP-only refresh cookies
    });
  } catch (err: any) {
    const isNetworkError =
      err?.name === 'TypeError' ||
      err?.message?.includes('Failed to fetch') ||
      err?.message?.includes('NetworkError');

    if (isNetworkError) {
      throw new Error(
        `Unable to connect to school server (${baseUrl}). Please check if the backend service is deployed and active.`,
      );
    }
    throw err;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const errorMsg =
      Array.isArray(data?.message)
        ? data.message.join(', ')
        : data?.message || 'An unexpected error occurred';
    throw new Error(errorMsg);
  }

  return data;
}
