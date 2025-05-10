<script setup lang="ts">
import { computed } from 'vue';

type CheckBoxValue = string | number;

interface CheckBoxProps {
    modelValue: boolean | CheckBoxValue[]
    label: string
    disabled: boolean
    labelClass: string
    value?: CheckBoxValue
    multiple?: boolean
}

const props = defineProps<CheckBoxProps>();

const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => {
    if (props.multiple && Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value as CheckBoxValue);
    }
    return props.modelValue as boolean;
});

const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (props.multiple && Array.isArray(props.modelValue)) {
        const newValue = [...props.modelValue];
        if (target.checked) {
            newValue.push(props.value as CheckBoxValue);
        } else {
            const index = newValue.indexOf(props.value as CheckBoxValue);
            if (index > -1) {
                newValue.splice(index, 1);
            }
        }
        emit('update:modelValue', newValue);
    } else {
        emit('update:modelValue', target.checked);
    }
};
</script>

<template>
    <label class="inline-flex items-center cursor-pointer" :class="{ 'opacity-50 cursor-not-allowed': disabled }">
        <div class="relative">
            <input type="checkbox" class="sr-only peer" :checked="isChecked" :disabled="disabled"
                @change="handleChange" />
            <div class="w-5 h-5 border-2 rounded transition-all duration-200 ease-in-out peer-focus:ring-2 peer-focus:ring-primary peer-focus:ring-opacity-50"
                :class="[
                    isChecked ? 'bg-primary border-primary animate-[checkmark_0.2s_ease-in-out]' : 'border-contrast',
                    disabled ? 'opacity-50' : 'hover:border-primary',
                ]" :style="isChecked ? {
                    animation: 'checkmark 0.2s ease-in-out',
                    transform: 'scale(1)',
                } : {}">
                <svg v-if="isChecked"
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
            <slot name="label">
                {{ label }}
            </slot>
        </span>
    </label>
</template>

<style>
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
