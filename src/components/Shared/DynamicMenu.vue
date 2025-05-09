<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const toggleMenu = () => {
    isOpen.value = !isOpen.value
}

</script>

<template>
    <div class="relative inline-block">
        <div class="cursor-pointer" @click="toggleMenu">
            <slot name="trigger"></slot>
        </div>

        <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="isOpen" class="absolute top-full left-0 min-w-[200px] mt-1 bg-white rounded-lg shadow-lg z-50">
                <slot name="content"></slot>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.dynamic-menu {
    position: relative;
    display: inline-block;
}

.trigger {
    cursor: pointer;
}

.menu-content {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 200px;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    margin-top: 4px;
}

/* Slide animation */
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
</style>