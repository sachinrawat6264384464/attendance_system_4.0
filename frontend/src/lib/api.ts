export const getApiUrl = (): string => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
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
        `Unable to reach school server (${baseUrl}). Please ensure backend is running or reachable.`,
      );
    }
    throw err;
  }

  // Handle Token Expiration (401 Unauthorized) with Auto-Refresh
  if (response.status === 401 && !cleanEndpoint.includes('/auth/login') && !cleanEndpoint.includes('/auth/refresh')) {
    try {
      const refreshRes = await fetch(`${baseUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newAccessToken = refreshData?.accessToken || refreshData?.data?.accessToken;

        if (newAccessToken && typeof window !== 'undefined') {
          localStorage.setItem('apex_token', newAccessToken);

          // Retry the original request with the renewed access token
          headers['Authorization'] = `Bearer ${newAccessToken}`;
          const retryRes = await fetch(url, {
            ...options,
            headers,
            credentials: 'include',
          });

          const retryData = await retryRes.json().catch(() => ({}));
          if (retryRes.ok) {
            return retryData;
          }
        }
      }
    } catch {
      // Refresh failed; fall through to clear tokens and notify
    }

    // If refresh failed or was invalid, clean up stale credentials
    if (typeof window !== 'undefined') {
      localStorage.removeItem('apex_token');
      localStorage.removeItem('apex_user');

      // If user is currently in dashboard, redirect to login
      if (window.location.pathname.startsWith('/dashboard')) {
        window.location.href = '/login?expired=true';
      }
    }
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
