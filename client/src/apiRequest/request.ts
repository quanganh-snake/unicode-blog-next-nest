/* eslint-disable @typescript-eslint/no-explicit-any */
export const request = {
  get: async (url: string, optional?: { params?: Record<string, any>; headers?: Record<string, string> }) => {
    const queryString = optional?.params
      ? '?' + new URLSearchParams(optional.params).toString()
      : '';

    return fetch(url + queryString, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...optional?.headers,
      },

    }).then((response) => response.json());
  },
  post: async (url: string, data: any) => {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },
  put: async (url: string, data: any) => {
    return fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },
  patch: async (url: string, data: any) => {
    return fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  },
  delete: async (url: string) => {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  },
}