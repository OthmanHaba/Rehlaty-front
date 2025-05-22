import axios, { AxiosError } from 'axios'
import type { AxiosResponse } from 'axios'
import config from '@/lib/config/api'
import { ApiError } from '@/lib/api/helpers/ApiError'
import { ApiFeedBackMessage } from './helpers/ApiFeedBackMessage'
import { useFeedbackMessage } from '@/composables/useFeedbackMessage.ts'
import { useValidationStore } from '@/composables/useValidationErrors'

const api = axios.create({
    baseURL: getSubdomain()
        ? `http://${getSubdomain()}.${import.meta.env.VITE_API_URL}`
        : import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
    timeout: config.api.timeout,
})
function getSubdomain(): string | null {
    const host = window.location.hostname // e.g., "sub.example.com"
    const parts = host.split('.')


    return parts[0] // "sub"
}
api.interceptors.request.use(
    (config) => {
        // Add token if available
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        // Log request
        console.debug(`🚀 Request: ${config.method?.toUpperCase()} ${config.url}`, {
            headers: config.headers,
            data: config.data,
        })

        return config
    },
    (error) => {
        console.error('Request Error:', error)
        return Promise.reject(error)
    },
)

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.debug(`✅ Response: ${response.status} ${response.config.url}`, {
            data: response.data,
        })
        return response
    },
    async (error: AxiosError) => {
        // const originalRequest = error.config as
        //     | (AxiosRequestConfig & { _retry?: number })
        //     | undefined

        // Log error response
        console.error('❌ Response Error:', {
            status: error.response?.status,
            url: error.config?.url,
            data: error.response?.data,
        })

        // const { t } = useI18n()
        //handle FeedBack Message
        if (error.response?.status === 403) {
            const data = error.response.data.feedback_message as { title: string; body: string }
            const feedBackMessage = new ApiFeedBackMessage(
                data.title,
                data.body,
                // ?? t('app.error.server_error')
            )
            const feedback = useFeedbackMessage()

            feedback.triggerFeedback({ type: 'warning', ...feedBackMessage })

            return Promise.reject(feedBackMessage)
        }

        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('token')
            window.location.href = '/login'
            return Promise.reject(new ApiError(401, 'Unauthorized'))
        }

        if (error.response?.status === 422) {
            const data = error.response.data.errors

            const validationErrors = useValidationStore()
            validationErrors.setErrors(data)

            console.log(validationErrors.errors.value)

            return Promise.reject(validationErrors)
        }
        // // Retry logic for network errors or 5xx server errors
        // if (
        //     originalRequest &&
        //     (error.code === 'ECONNABORTED' ||
        //         (error.response?.status && error.response.status >= 500)) &&
        //     (!originalRequest._retry || originalRequest._retry < config.api.retry)
        // ) {
        //     originalRequest._retry = (originalRequest._retry || 0) + 1
        //
        //     // Wait before retrying
        //     const retryCount = originalRequest._retry ?? 0
        //     await new Promise((resolve) => setTimeout(resolve, config.api.retryDelay * retryCount))
        //
        //     // Retry the request
        //     return api(originalRequest)
        // }

        // Create a custom error with more details
        const errorMessage =
            typeof error.response?.data === 'object' && error.response?.data !== null
                ? (error.response.data as { message?: string }).message
                : undefined

        const apiError = new ApiError(
            error.response?.status || 500,
            errorMessage || error.message || 'An unexpected error occurred',
            error.response?.data,
        )

        return Promise.reject(apiError)
    },
)

// Helper function to create a cancel token
export const createCancelToken = () => axios.CancelToken.source()

export default api
