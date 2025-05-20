<script setup lang="ts">
import { useI18n } from 'vue-i18n'
//todo add icons support with rtl and ltr icon with prefixed and suffix
interface Props {
    modelValue: string | number
    label?: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
    placeholder?: string
    name?: string
    required?: boolean
    disabled?: boolean
    error?: string
    autocomplete?: string
    min?: number
    max?: number
    step?: number
    pattern?: string
    customClass?: string
}

defineProps<Props>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
    (e: 'blur'): void
    (e: 'focus'): void
}>()

const inputId = `input-${Math.random().toString(36).substr(2, 9)}`
const { locale } = useI18n()
</script>

<template>
    <div :class="['flex flex-col gap-2 w-full', customClass]">
        <label v-if="label" :for="inputId" class="text-sm font-medium text-contrast" :class="{
            'text-right': locale === 'ar'
        }">
            {{ label }}
            <span v-if="required" class="text-red-500 ml-1">*</span>
        </label>

        <input :id="inputId" :type="type" :value="modelValue" :placeholder="placeholder" :name="name"
            :required="required" :disabled="disabled" :autocomplete="autocomplete" :min="min" :max="max" :step="step"
            :pattern="pattern" :class="[
                locale === 'ar' ? 'text-right' : '',
                'w-full px-3 py-2.5 text-sm rounded-md border transition-all duration-200',
                'focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/10',
                'disabled:bg-secondary disabled:cursor-not-allowed disabled:opacity-70',
                'text-contrast bg-background border-secondary',
                error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/10' : ''
            ]" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" @blur="emit('blur')"
            @focus="emit('focus')" />

        <span v-if="error" class="text-xs text-red-500">{{ error }}</span>
    </div>
</template>
