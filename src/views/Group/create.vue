<script setup lang="ts">
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import type { Group } from '@/types'
import { ref, computed } from 'vue'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import Api from '@/lib/api/base.ts'
import endpoints from '@/lib/endpoints'
import type { ApiError } from '@/lib/api/helpers/ApiError'
import { useToast } from '@/composables/useToast'

const router = useRouter()

const form = ref<Group>({
    name: '',
    description: '',
})

const { error } = useToast();

// Since GroupRepository doesn't have a create method, we'll implement it directly
const createGroupMutation = useMutation({
    mutationFn: (groupData: Group) => {
        // Use the API directly since GroupRepository doesn't have a create method
        return Api.post(endpoints.GROUPS(), groupData)
    },
    onSuccess: () => {
        router.push('/groups')
    },
    onError: (_error: ApiError) => {
        error(_error.message)
    }
})

const isPending = computed(() => createGroupMutation.isPending.value)

const submit = () => {
    createGroupMutation.mutate(form.value)
}
</script>

<template>
    <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
        {{ $t('group.add') }}
    </div>
    <div class="mt-4 border p-2 border-primary/10 shadow-xs bg-white dark:bg-dark-700">
        <FormWrapper @submit.prevent="submit">
            <FormInput v-model="form.name" :label="$t('group.name')" />
            <div>
                <label for="description" class="block text-sm font-medium mb-2">
                    {{ $t('group.description') }}
                </label>
                <textarea class="border border-primary rounded-sm bg-white dark:bg-dark-700 w-full p-2"
                    v-model="form.description">
                </textarea>
            </div>

            <div class="flex justify-end mt-4">
                <button type="submit"
                    class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition duration-200"
                    :disabled="isPending">
                    {{ $t('common.save') }}
                </button>
            </div>
        </FormWrapper>
    </div>
</template>

<style scoped></style>
