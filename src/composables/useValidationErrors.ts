import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { ref } from 'vue'

interface ValidationErrors {
    [key: string]: string[]
}

export const useValidationStore = defineStore('validation', () => {
    const errors: Ref<ValidationErrors> = ref({})
    const hasErrors: Ref<boolean> = ref(false)

    const setErrors = (newErrors: ValidationErrors) => {
        errors.value = newErrors
        hasErrors.value = Object.keys(newErrors).length > 0
    }

    const clearErrors = () => {
        errors.value = {}
        hasErrors.value = false
    }

    const getErrors = (field: string): string[] => {
        return errors.value[field] || []
    }

    const hasFieldError = (field: string): boolean => {
        return errors.value[field]?.length > 0
    }

    return {
        errors,
        hasErrors,
        setErrors,
        clearErrors,
        getErrors,
        hasFieldError,
    }
})
