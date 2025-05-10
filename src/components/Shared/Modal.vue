<script lang="ts" setup>
import { ref, watch } from 'vue';
import Button from './Button.vue';
interface Props {
    modelValue: boolean;
    title?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showClose?: boolean;
    persistent?: boolean;
    closeOnBackdrop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    title: '',
    size: 'md',
    showClose: true,
    persistent: false,
    closeOnBackdrop: true
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void;
    (e: 'close'): void;
}>();

const isVisible = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
    isVisible.value = newValue;
    if (newValue) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

const closeModal = () => {
    if (!props.persistent) {
        emit('update:modelValue', false);
        emit('close');
    }
};

const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget && props.closeOnBackdrop && !props.persistent) {
        closeModal();
    }
};

const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
};
</script>

<template>
    <Teleport to="body">
        <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0"
            enter-to-class="opacity-100" leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100" leave-to-class="opacity-0">
            <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                @click="handleBackdropClick">
                <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-150 ease-in"
                    leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
                    <div v-if="modelValue" :class="[
                        'relative w-full bg-background rounded-lg shadow-xl',
                        sizeClasses[size]
                    ]" role="dialog" aria-modal="true" @click.stop>
                        <!-- Header -->
                        <div class="flex items-center justify-between p-4 border-b border-secondary">
                            <h3 class="text-lg font-semibold text-contrast">
                                {{ title }}
                            </h3>
                            <Button icon="mdi:close" variant="primary" @click="closeModal" />
                        </div>

                        <!-- Body -->
                        <div class="p-4">
                            <slot></slot>
                        </div>

                        <!-- Footer -->
                        <div class="flex items-center justify-end gap-2 p-4 border-t border-secondary">
                            <slot name="footer">
                                <Button variant="primary" @click="closeModal" :label="$t('common.confirm')" />
                            </slot>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>