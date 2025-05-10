<script setup lang="ts">
interface Props {
    title?: string
    description?: string
    customClass?: string
}

defineProps<Props>()
</script>

<template>
    <form :class="['w-full space-y-6', customClass]">
        <!-- Form Header -->
        <div v-if="title || description" class="space-y-2">
            <h2 v-if="title" class="text-xl font-semibold text-contrast text-end">
                {{ title }}
            </h2>
            <p v-if="description" class="text-sm text-contrast/70 text-end">
                {{ description }}
            </p>
        </div>

        <!-- Form Content -->
        <div class="space-y-4">
            <slot></slot>
        </div>

        <!-- Form Actions -->
        <div class="flex items-center justify-end gap-3 pt-4">
            <slot name="actions"></slot>
        </div>
    </form>
</template>
