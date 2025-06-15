const baseUrl = import.meta.env.VITE_API_URL || "";

export const apiFetch = (endpoint: string, options?: RequestInit) => {
  const url = `${baseUrl}${endpoint}`;
  return fetch(url, options);
};
