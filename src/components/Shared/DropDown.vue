<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core';
import { Icon } from '@iconify/vue';

interface DropdownItem {
    id: string | number;
    label: string;
    value: string | number;
    icon?: string;
}

interface Props {
    items: DropdownItem[];
    modelValue?: string | number;
    placeholder?: string;
    disabled?: boolean;
    triggerIcon?: string;
    position?: 'start' | 'end';
    dir?: 'ltr' | 'rtl';
}

const props = withDefaults(defineProps<Props>(), {
    items: () => [],
    placeholder: 'Select an option',
    disabled: false,
    triggerIcon: 'heroicons:chevron-down',
    position: 'end',
    dir: 'ltr'
});

const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void;
    (e: 'select', item: DropdownItem): void;
}>();

const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const selectedItem = computed(() =>
    props.items.find(item => item.value === props.modelValue)
);

const toggleDropdown = () => {
    if (!props.disabled) {
        isOpen.value = !isOpen.value;
    }
};

const selectItem = (item: DropdownItem) => {
    emit('update:modelValue', item.value);
    emit('select', item);
    isOpen.value = false;
};

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
    isOpen.value = false;
});
</script>

<template>
    <div ref="dropdownRef" class="relative" :dir="dir">
        <button @click="toggleDropdown" :disabled="disabled"
            class="flex items-center justify-between w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            :class="[
                disabled ? 'bg-gray-100 cursor-not-allowed text-gray-400' : 'bg-white hover:bg-gray-50 text-gray-700',
                isOpen ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
            ]">
            <span class="flex items-center">
                <span v-if="selectedItem?.icon" :class="[
                    'text-gray-500',
                    dir === 'rtl' ? 'ml-2' : 'mr-2'
                ]">
                    <Icon :icon="selectedItem.icon" class="w-5 h-5" />
                </span>
                <span :class="{ 'text-gray-400': !selectedItem }">{{ selectedItem?.label || placeholder }}</span>
            </span>
            <Icon :icon="triggerIcon" class="w-5 h-5 text-gray-400 transition-transform duration-200"
                :class="{ 'rotate-180': isOpen }" />
        </button>

        <Transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="isOpen"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                :class="[position === 'end' ? 'end-0' : 'start-0']">
                <div class="py-1">
                    <button v-for="item in items" :key="item.id" @click="selectItem(item)"
                        class="flex items-center w-full px-4 py-2.5 text-sm hover:bg-gray-50 focus:outline-none transition-colors duration-150"
                        :class="{
                            'bg-blue-50 text-blue-600': item.value === modelValue,
                            'text-gray-700': item.value !== modelValue
                        }">
                        <span v-if="item.icon" :class="[
                            dir === 'rtl' ? 'ml-2' : 'mr-2'
                        ]">
                            <Icon :icon="item.icon" class="w-5 h-5"
                                :class="{ 'text-blue-500': item.value === modelValue }" />
                        </span>
                        <span class="flex-1 text-start">{{ item.label }}</span>
                    </button>
                </div>
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.overflow-auto {
    scrollbar-width: thin;
    scrollbar-color: #E5E7EB transparent;
}

.overflow-auto::-webkit-scrollbar {
    width: 6px;
}

.overflow-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-auto::-webkit-scrollbar-thumb {
    background-color: #E5E7EB;
    border-radius: 3px;
}

/* RTL specific styles */
[dir="rtl"] .rotate-180 {
    transform: rotate(180deg);
}
</style>