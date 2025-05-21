<script setup lang="ts">
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import type { Group } from '@/types'
import { ref } from 'vue'

const form = ref<Group>({
    name: '',
    description: '',
})

const submit = () => {
    alert('Form submitted!')
}
</script>

<template>
    <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
        {{ $t('group.add') }}
    </div>
    <div class="mt-4 border p-2 border-primary/10 shadow-xs bg-white dark:bg-dark-700">
        <FormWrapper @submit.prevent="submit">
            <FormInput v-model="form.name" :label="$t('group.name')"  />
            <div>
                <label for="description" class="block text-sm font-medium mb-2">
                    {{$t('group.description')}}
                </label>
                <textarea
                    class="border border-primary rounded-sm bg-white dark:bg-dark-700 w-full p-2"
                    v-model="form.description"
                >
                </textarea>
            </div>

            <div class="flex justify-end mt-4">
                <button
                    type="submit"
                    class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition duration-200"
                >
                    {{$t('common.save')}}
                </button>
            </div>
        </FormWrapper>
    </div>
</template>

<style scoped></style>
