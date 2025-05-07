export default {
    api: {
        baseUrl: import.meta.env.VITE_API_URL,
        timeout: 5000,
        retry: 3,
        retryDelay: 1000,
    },
}
