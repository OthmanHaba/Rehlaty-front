<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { ref, computed } from 'vue'
import { UserRepository } from '@/lib/repsitories/User'
import Modal from '@/components/Shared/Modal.vue'
import Button from '@/components/Shared/Button.vue'
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import DropDown from '@/components/Shared/DropDown.vue'
import { useValidationStore } from '@/composables/useValidationErrors'
import { useMutation, useQuery } from '@tanstack/vue-query'
import { RoleRepository } from '@/lib/repsitories/Role.ts'
import type { User } from '@/types/User'
import { useToast } from '@/composables/useToast'
import type { ApiError } from '@/lib/api/helpers/ApiError'
import Pagination from '@/components/Shared/Pagination.vue'

const { error } = useToast();

interface DropdownItem {
    id: number
    label: string
    value: number
    icon?: string
}

const search = ref<string>('')

const { data, isLoading, refetch } = useQuery({
    queryKey: ['users', search],
    queryFn: () => UserRepository.getUsers(search.value),
})

interface UserRequest {
    id?: number
    name: string
    username: string
    email: string
    password: string
    password_confirmation: string
    role: string
}

const mutate = useMutation({
    mutationKey: ['users'],
    mutationFn: (user: UserRequest) => {
        if (user.id) {
            return UserRepository.updateUser(String(user.id), user)
        } else {
            return UserRepository.createUser(user)
        }
    },
    onSuccess: () => {
        refetch()
        isModalOpen.value = false
    },
    onError: (_error: ApiError) => {
        error(_error.message ?? 'Failed to create user')
    }
})

const page = ref(1);

const rolesRep = useQuery({
    queryKey: ['roles', search],
    queryFn: () => RoleRepository.getRoles(),


})

const validationErrors = useValidationStore()

const roleOptions = computed(() => {
    if (!rolesRep.data.value) {
        return []
    }
    return rolesRep.data.value.data?.map((role) => ({
        id: role.id,
        label: role.name,
        value: role.id,
        icon: 'mdi:account-group',
    })) as DropdownItem[]
})


const isModalOpen = ref(false)
const formData = ref<Partial<UserRequest>>({
    id: 0,
    name: '',
    username: '',
    email: '',
    password: undefined,
    password_confirmation: undefined,
    role: '',
})

const openModal = (user: User | null) => {
    isModalOpen.value = true
    console.log(user)
    if (user) {
        formData.value = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            password: undefined,
            password_confirmation: undefined,
            role: user.role?.id.toString() || '',
        }
    } else {
        resetForm()
    }
}

const resetForm = () => {
    formData.value = {
        id: 0,
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
    }
}

const handleSearch = (_search: string) => {
    search.value = _search
    refetch()
}

const handleSubmit = () => mutate.mutate(formData.value)

const handlePageChange = (_page: number) => {
    page.value = _page
    refetch()
}
</script>

<template>
    <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
        <header class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-contrast">
                {{ $t('app.page.title', { title: 'users' }) }}
            </h1>
            <p class="text-sm text-contrast/70">
                {{ $t('app.common.description', { description: 'users' }) }}
            </p>
            <div class="flex justify-end">
                <Button @click="openModal(null)" icon="mdi:plus" variant="primary" :label="$t('common.add')" />
            </div>

            <Modal size="xl" no-footer v-model="isModalOpen" @close="isModalOpen = false" :title="$t('common.add')"
                :description="$t('common.add')">
                <FormWrapper @submit.prevent="handleSubmit" :title="$t('common.add')" :description="$t('common.add')">
                    <FormInput :label="$t('user.name')" v-model="formData.name"
                        :error="validationErrors.getErrors('name')?.[0] || ''" />
                    <FormInput :label="$t('user.username')" v-model="formData.username"
                        :error="validationErrors.getErrors('username')?.[0] || ''" />
                    <FormInput :label="$t('user.email')" v-model="formData.email"
                        :error="validationErrors.getErrors('email')?.[0] || ''" />
                    <FormInput :label="$t('user.password')" v-model="formData.password" type="password"
                        :error="validationErrors.getErrors('password')?.[0] || ''" />
                    <FormInput :label="$t('user.password_confirmation')" v-model="formData.password_confirmation"
                        type="password" :error="validationErrors.getErrors('password')?.[0] || ''" />

                    <DropDown v-model="formData.role" :label="$t('user.role')" :items="roleOptions"
                        :error="validationErrors.getErrors('role')?.[0] || ''" />

                    <template #actions>
                        <Button type="submit" icon="mdi:plus" variant="primary" :label="$t('common.add')" />
                    </template>
                </FormWrapper>
            </Modal>
        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10 shadow-xs bg-white dark:bg-dark-700">
        <DataTable :columns="data?.data.meta?.columns ?? []" :data="data?.data.data ?? []" :loading="isLoading"
            has-search @search="handleSearch" :appends="[{ key: 'actions', label: 'actions', slot: 'actions' }]">
            <template #role="{ row }">
                <span class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    {{ row.role?.name || '' }}
                </span>
            </template>

            <template #actions="{ row }">
                <div class="flex gap-2">
                    <Button @click="openModal(row as unknown as User)" icon="mdi:pencil" variant="primary" />
                </div>
            </template>
        </DataTable>

        <Pagination v-if="!isLoading && data?.data.meta" :pagination="data.data.meta" @page-change="handlePageChange" />

    </div>
</template>
