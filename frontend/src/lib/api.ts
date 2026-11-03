export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

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

  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include', // Includes HTTP-only refresh cookies
  });

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

