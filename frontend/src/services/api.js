import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authAPI = {
    login: (username, password) => api.post('/auth/login/', { username, password }),
    register: (userData) => api.post('/auth/register/', userData),
    refreshToken: (refresh) => api.post('/auth/token/refresh/', { refresh }),
};

export const jobsAPI = {
    getAll: (params) => api.get('/jobs/', { params }),
    getById: (id) => api.get(`/jobs/${id}/`),
    create: (jobData) => api.post('/jobs/', jobData),
    update: (id, jobData) => api.put(`/jobs/${id}/`, jobData),
    delete: (id) => api.delete(`/jobs/${id}/`),
    apply: (id, data) => api.post(`/jobs/${id}/apply/`, data),
    approve: (id) => api.post(`/jobs/${id}/approve/`),
};

export const applicationsAPI = {
    getAll: () => api.get('/applications/'),
};

export const categoriesAPI = {
    getAll: () => api.get('/categories/'),
};

export default api;
