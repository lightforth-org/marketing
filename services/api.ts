// services/api.ts

/**
 * Base API service for handling all API requests in the Next.js application
 * This centralized approach makes it easier to maintain and update API calls
 */

// Base URL for API requests
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.ligtforth.org";

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

// Common headers for all requests
const getDefaultHeaders = () => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Add authentication token if available
  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Helper function to get auth token (implement based on your auth strategy)
const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

// Timeout promise for request cancellation
const timeoutPromise = (ms: number): Promise<never> => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request timed out after ${ms}ms`));
    }, ms);
  });
};

// Error handler for request failures
const handleApiError = (error: any) => {
  // Log the error for debugging
  console.error("API Error:", error);

  // Format the error response
  if (error.name === "AbortError") {
    return { error: "Request was aborted", status: 408 };
  }

  if (error.message.includes("timed out")) {
    return { error: "Request timed out", status: 408 };
  }

  return {
    error: error.message || "An unknown error occurred",
    status: error.status || 500,
  };
};

// Process API response
const processResponse = async (response: Response) => {
  const contentType = response.headers.get("content-type");

  if (!response.ok) {
    const error: any = new Error("API request failed");

    // Try to parse error response
    if (contentType?.includes("application/json")) {
      try {
        error.data = await response.json();
      } catch (parseError) {
        error.data = await response.text();
      }
    } else {
      error.data = await response.text();
    }

    error.status = response.status;
    throw error;
  }

  // Parse successful response
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return response.text();
};

/**
 * Core fetch function with error handling, timeout, and common configuration
 */
const fetchWithConfig = async (
  url: string,
  options: RequestInit = {},
  timeout = DEFAULT_TIMEOUT
) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(url, {
      ...options,
      headers: {
        ...getDefaultHeaders(),
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return await processResponse(response);
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * API service methods for different HTTP methods
 */
const apiService = {
  /**
   * GET request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @param options - Fetch options
   * @param timeout - Request timeout in ms
   */
  get: async <T>(
    endpoint: string,
    params: Record<string, any> = {},
    options: RequestInit = {},
    timeout = DEFAULT_TIMEOUT
  ): Promise<T> => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    const url = `${API_BASE_URL}${endpoint}${
      queryString ? `?${queryString}` : ""
    }`;

    return fetchWithConfig(url, { ...options, method: "GET" }, timeout);
  },

  /**
   * POST request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param options - Fetch options
   * @param timeout - Request timeout in ms
   */
  post: async <T>(
    endpoint: string,
    data: any = {},
    options: RequestInit = {},
    timeout = DEFAULT_TIMEOUT
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    return fetchWithConfig(
      url,
      {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
      },
      timeout
    );
  },

  /**
   * PUT request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param options - Fetch options
   * @param timeout - Request timeout in ms
   */
  put: async <T>(
    endpoint: string,
    data: any = {},
    options: RequestInit = {},
    timeout = DEFAULT_TIMEOUT
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    return fetchWithConfig(
      url,
      {
        ...options,
        method: "PUT",
        body: JSON.stringify(data),
      },
      timeout
    );
  },

  /**
   * PATCH request
   * @param endpoint - API endpoint
   * @param data - Request body
   * @param options - Fetch options
   * @param timeout - Request timeout in ms
   */
  patch: async <T>(
    endpoint: string,
    data: any = {},
    options: RequestInit = {},
    timeout = DEFAULT_TIMEOUT
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    return fetchWithConfig(
      url,
      {
        ...options,
        method: "PATCH",
        body: JSON.stringify(data),
      },
      timeout
    );
  },

  /**
   * DELETE request
   * @param endpoint - API endpoint
   * @param options - Fetch options
   * @param timeout - Request timeout in ms
   */
  delete: async <T>(
    endpoint: string,
    options: RequestInit = {},
    timeout = DEFAULT_TIMEOUT
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;

    return fetchWithConfig(
      url,
      {
        ...options,
        method: "DELETE",
      },
      timeout
    );
  },

  /**
   * Upload files using form data
   * @param endpoint - API endpoint
   * @param files - Files to upload
   * @param additionalData - Additional form data
   * @param options - Fetch options
   * @param timeout - Request timeout in ms
   */
  uploadFiles: async <T>(
    endpoint: string,
    files: File | File[],
    additionalData: Record<string, any> = {},
    options: RequestInit = {},
    timeout = DEFAULT_TIMEOUT
  ): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const formData = new FormData();

    // Add files to form data
    if (Array.isArray(files)) {
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });
    } else {
      formData.append("file", files);
    }

    // Add additional data
    Object.entries(additionalData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // For file uploads, we don't want to set Content-Type as the browser will set it
    // with the correct boundary for the multipart/form-data
    const headers = getDefaultHeaders();
    delete headers["Content-Type"];

    return fetchWithConfig(
      url,
      {
        ...options,
        method: "POST",
        headers,
        body: formData,
      },
      timeout
    );
  },
};

export default apiService;
