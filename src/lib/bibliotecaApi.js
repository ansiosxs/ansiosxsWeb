const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const TOKEN_KEY = 'insectaria_token';

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }

  get fieldErrors() {
    return fieldErrorsOf(this.data);
  }
}

let onUnauthorized = null;

export const setUnauthorizedHandler = (handler) => {
  onUnauthorized = handler;
};

const fieldErrorsOf = (data) => {
  if (!data?.errors) return {};
  return Object.entries(data.errors).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value) ? value[0] : value;
    return acc;
  }, {});
};

async function request(path, { method = 'GET', body } = {}) {
  const token = tokenStore.get();

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (response.status === 401) {
    tokenStore.clear();
    onUnauthorized?.();
    throw new ApiError('Tu sesión expiró. Vuelve a iniciar sesión.', 401, null);
  }

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const fieldErrors = fieldErrorsOf(data);
    const fallback = Object.keys(fieldErrors).length > 0
      ? Object.values(fieldErrors)[0]
      : data.message || 'Error en la solicitud';
    throw new ApiError(fallback, response.status, data);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const authApi = {
  async login(email, password) {
    const data = await request('/login', {
      method: 'POST',
      body: { email, password, device_name: 'biblioteca-web' },
    });
    tokenStore.set(data.token);
    return data.user;
  },

  async me() {
    return request('/me');
  },

  async logout() {
    try {
      return await request('/logout', { method: 'POST' });
    } finally {
      tokenStore.clear();
    }
  },
};

export const bibliotecaApi = {
  getLibros: () => request('/libros'),

  createLibro: (libro) => request('/libros', { method: 'POST', body: libro }),

  updateLibro: (id, libro) =>
    request(`/libros/${id}`, { method: 'PUT', body: libro }),

  deleteLibro: (id) => request(`/libros/${id}`, { method: 'DELETE' }),
};
