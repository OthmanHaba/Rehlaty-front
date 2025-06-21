<script setup lang="ts">
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import type { Group } from '@/types'
import { ref, computed } from 'vue'
import { useCreateGroupMutation } from '@/lib/queries/group'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'

const router = useRouter()

const form = ref<Group>({
    name: '',
    description: '',
})

const { error } = useToast();

// Since GroupRepository doesn't have a create method, we'll implement it directly
const createGroupMutation = useCreateGroupMutation(
  () => router.push('/groups'),
  (_error) => error(_error.message)
)

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
