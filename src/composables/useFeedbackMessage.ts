import { ApiFeedBackMessage } from '@/lib/api/helpers/ApiFeedBackMessage'
import { useToast, type ToastType, type ToastOptions } from '@/composables/useToast'

interface ExtendedApiFeedBackMessage extends ApiFeedBackMessage {
    type?: ToastType
}

export function useFeedbackMessage() {
    const toast = useToast()

    const showFeedbackMessage = (message: ExtendedApiFeedBackMessage): void => {
        const type = message.type || 'success'
        const toastMethod = toast[type as keyof typeof toast]
        if (typeof toastMethod === 'function') {
            toastMethod(message.body, {
                title: message.title,
            } as Omit<ToastOptions, 'message' | 'type'>)
        }
    }

    const triggerFeedback = (feedbackMessage: ExtendedApiFeedBackMessage): void => {
        showFeedbackMessage(feedbackMessage)
    }

    return {
        showFeedbackMessage,
        triggerFeedback,
    }
}
