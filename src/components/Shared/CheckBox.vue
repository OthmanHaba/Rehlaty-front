<script setup lang="ts">
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    },
    labelClass: {
        type: String,
        default: ''
    }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <label class="inline-flex items-center cursor-pointer" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
        <div class="relative">
            <input type="checkbox" class="sr-only" :checked="modelValue" :disabled="disabled"
                @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
            <div class="w-5 h-5 border-2 rounded transition-all duration-200 ease-in-out" :class="[
                modelValue ? 'bg-primary border-primary' : 'border-contrast',
                disabled ? 'opacity-50' : 'hover:border-primary',
            ]">
                <svg v-if="modelValue"
                    class="w-4 h-4 text-background absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        </div>
        <span v-if="label" class="ml-2 text-sm" :class="[
            disabled ? 'text-contrast/50' : 'text-contrast',
            labelClass
        ]">
            {{ label }}
        </span>
    </label>
</template>



<style scoped>
/* Custom focus styles */
input:focus+div {
    @apply ring-2 ring-primary ring-opacity-50;
}

/* Custom animation for checkbox */
input:checked+div {
    animation: checkmark 0.2s ease-in-out;
}

@keyframes checkmark {
    0% {
        transform: scale(0.8);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}
</style>
