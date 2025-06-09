const baseUrl = import.meta.env.VITE_API_URL || "/api";

export const apiFetch = (endpoint: string, options?: RequestInit) => {
  const url = `${baseUrl}${endpoint}`;
  return fetch(url, options);
};

// add CRUD functions here
