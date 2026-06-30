import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

// Create axios instance with base URL and default headers
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});




// Add JWT token to requests if available
apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/token/refresh/")
        ) {
            originalRequest._retry = true;

            try {
                const refresh = localStorage.getItem("refresh_token");

                const res = await axios.post(
                    `${API_URL}/token/refresh/`,
                    { refresh }
                );

                const newAccess = res.data.access;

                localStorage.setItem("access_token", newAccess);

                originalRequest.headers.Authorization =
                    `Bearer ${newAccess}`;

                return apiClient(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient
