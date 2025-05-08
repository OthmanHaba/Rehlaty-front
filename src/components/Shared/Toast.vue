<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import type { ToastType } from '@/composables/useToast';

interface Props {
    message: string;
    type?: ToastType;
    duration?: number;
    title?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: 'success',
    duration: 3000,
    title: undefined
});

const emit = defineEmits<{
    (e: 'close'): void
}>();

const isVisible = ref(true);
const progress = ref(100);
let timer: number | undefined;
let progressTimer: number | undefined;

const close = () => {
    isVisible.value = false;
    emit("close");
};

onMounted(() => {
    timer = window.setTimeout(close, props.duration);

    const startTime = Date.now();
    const updateProgress = () => {
        const elapsedTime = Date.now() - startTime;
        progress.value = 100 - (elapsedTime / props.duration) * 100;
        if (progress.value > 0) {
            progressTimer = requestAnimationFrame(updateProgress);
        }
    };
    progressTimer = requestAnimationFrame(updateProgress);
});

onUnmounted(() => {
    if (timer) clearTimeout(timer);
    if (progressTimer) cancelAnimationFrame(progressTimer);
});

defineExpose({
    close,
});
</script>

<template>
    <transition enter-active-class="transform ease-out duration-300 transition"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0" leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="isVisible"
            class="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden fixed top-2 right-4 z-50">
            <div class="p-4">
                <div class="flex items-start">
                    <div class="flex-shrink-0">
                        <svg v-if="type === 'success'" class="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <svg v-else-if="type === 'warning'" class="h-6 w-6 text-yellow-400"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <svg v-else-if="type === 'error'" class="h-6 w-6 text-red-400"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div class="ml-3 w-0 flex-1 pt-0.5">
                        <p class="text-sm font-medium text-gray-900">{{ message }}</p>
                    </div>
                    <div class="ml-4 flex-shrink-0 flex">
                        <button @click="close"
                            class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span class="sr-only">Close</span>
                            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="bg-gray-200 h-1">
                <div class="h-1 transition-all duration-75 ease-linear" :class="{
                    'bg-green-500': type === 'success',
                    'bg-yellow-500': type === 'warning',
                    'bg-red-500': type === 'error',
                }" :style="{ width: `${progress}%` }"></div>
            </div>
        </div>
    </transition>
</template>
