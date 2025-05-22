<template>
    <button :class="[
        'px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2',
        {
            'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50': variant === 'primary',
            'bg-accent text-contrast hover:bg-accent/90 focus:ring-accent/50': variant === 'accent',
            'bg-secondary text-contrast hover:bg-secondary/90 focus:ring-secondary/50': variant === 'secondary',
            'bg-contrast text-white hover:bg-contrast/90 focus:ring-contrast/50': variant === 'contrast',
            'bg-danger text-white hover:bg-danger/90 focus:ring-danger/50': variant === 'danger',
            'opacity-50 cursor-not-allowed': disabled || loading,
            'w-full': fullWidth
        }
    ]" :disabled="disabled || loading" @click="$emit('click', $event)">
        <Icon v-if="loading" icon="mdi:loading" class="animate-spin" :width="20" :height="20" />
        <Icon v-else-if="icon" :icon="icon" :width="20" :height="20" />
        <span v-show="label">{{ label }}</span>
        <slot></slot>
    </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
    variant: {
        type: String,
        default: 'primary',
        validator: (value: string) => ['primary', 'accent', 'secondary', 'contrast', 'danger'].includes(value)
    },
    disabled: {
        type: Boolean,
        default: false
    },
    fullWidth: {
        type: Boolean,
        default: false
    },
    icon: {
        type: String,
        default: ''
    },
    loading: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    }
})

defineEmits(['click'])
</script>
