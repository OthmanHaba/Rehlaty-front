export default {
    api: {
        //api base url
        baseUrl: import.meta.env.VITE_API_URL,
        //time out per request
        timeout: 5000,
        // number of requests per time
        retry: 3,
        // base delay per request
        retryDelay: 1000,
    },
}
