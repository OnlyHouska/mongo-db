import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth API
export const authApi = {
    login: (credentials) => api.post('/login', credentials),
    register: (data) => api.post('/register', data),
    logout: () => api.post('/logout'),
    me: () => api.get('/me'),
    refresh: () => api.post('/refresh'),
};

// Books API
export const booksApi = {
    getAll: (params) => api.get('/books', { params }),
    getOne: (id) => api.get(`/books/${id}`),
    create: (data) => api.post('/books', data),
    update: (id, data) => api.put(`/books/${id}`, data),
    delete: (id) => api.delete(`/books/${id}`),
    getGenres: () => api.get('/books/genres'),
};

// Readers API
export const readersApi = {
    getAll: (params) => api.get('/readers', { params }),
    getOne: (id) => api.get(`/readers/${id}`),
    create: (data) => api.post('/readers', data),
    update: (id, data) => api.put(`/readers/${id}`, data),
    delete: (id) => api.delete(`/readers/${id}`),
};

// Loans API
export const loansApi = {
    getAll: (params) => api.get('/loans', { params }),
    getOne: (id) => api.get(`/loans/${id}`),
    create: (data) => api.post('/loans', data),
    return: (id) => api.post(`/loans/${id}/return`),
    getMyLoans: () => api.get('/loans/my'),
};

export default api;
