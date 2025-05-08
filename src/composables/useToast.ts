import { ref, h, render } from 'vue'
import Toast from '@/components/Shared/Toast.vue'

export type ToastType = 'success' | 'warning' | 'error'

export interface ToastOptions {
    message: string
    type?: ToastType
    duration?: number
    title?: string
}

export interface ToastInstance {
    close: () => void
    el: HTMLElement
}

export function useToast() {
    const toasts = ref<ToastInstance[]>([])

    const showToast = ({
        message,
        type = 'success',
        duration = 3000,
        title,
    }: ToastOptions): ToastInstance => {
        let instance: ToastInstance

        const toastInstance = h(Toast, {
            message,
            type,
            duration,
            title,
            onClose: () => removeToast(instance),
        })

        const container = document.createElement('div')
        render(toastInstance, container)
        document.body.appendChild(container)

        instance = {
            close: () => {
                const component = toastInstance.component
                if (component?.exposed?.close) {
                    component.exposed.close()
                }
            },
            el: container,
        }

        toasts.value.push(instance)

        return instance
    }

    const removeToast = (toast: ToastInstance): void => {
        const index = toasts.value.indexOf(toast)
        if (index > -1) {
            toasts.value.splice(index, 1)
            const container = toast.el.parentElement
            if (container) {
                render(null, container)
                document.body.removeChild(container)
            }
        }
    }

    const success = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
        return showToast({ ...options, message, type: 'success' })
    }

    const warning = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
        return showToast({ ...options, message, type: 'warning' })
    }

    const error = (message: string, options?: Omit<ToastOptions, 'message' | 'type'>) => {
        return showToast({ ...options, message, type: 'error' })
    }

    return {
        showToast,
        success,
        warning,
        error,
    }
}
