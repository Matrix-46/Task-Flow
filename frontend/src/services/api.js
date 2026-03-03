import axios from 'axios';

const rawAPI = import.meta.env.VITE_API_URL || '/api/v1';
const baseAPI = rawAPI.trim();
const API_URL = baseAPI.endsWith('/') ? baseAPI : `${baseAPI}/`;

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Add token to requests if available
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const res = await axios.get(`${API_URL}/auth/refresh`, { withCredentials: true });
                if (res.status === 200) {
                    const { accessToken } = res.data.data;
                    localStorage.setItem('token', accessToken);
                    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh token also expired or invalid
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// Auth APIs
export const authAPI = {
    register: (data) => api.post('auth/register', data),
    login: (data) => api.post('auth/login', data),
    getMe: () => api.get('auth/me')
};

// Task APIs
export const taskAPI = {
    getTasks: (status, search, page = 1, limit = 10) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (search) params.append('search', search);
        if (page) params.append('page', page);
        if (limit) params.append('limit', limit);
        const queryString = params.toString();
        return api.get(`tasks${queryString ? `?${queryString}` : ''}`);
    },
    getTask: (id) => api.get(`tasks/${id}`),
    createTask: (data) => api.post('tasks', data),
    updateTask: (id, data) => api.put(`tasks/${id}`, data),
    deleteTask: (id) => api.delete(`tasks/${id}`)
};

export default api;
