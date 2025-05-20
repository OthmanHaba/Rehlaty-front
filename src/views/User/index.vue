<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { ref, onMounted, computed, toRefs } from 'vue'
import type { User, Role } from '@/types/User'
import { UserRepository } from '@/lib/repsitories/User'
import type { DataTableColumn } from '@/types'
import Modal from '@/components/Shared/Modal.vue'
import Button from '@/components/Shared/Button.vue'
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import { RoleRepository } from '@/lib/repsitories/Role'
import DropDown from '@/components/Shared/DropDown.vue'
import { useValidationStore } from '@/composables/useValidationErrors'


interface DropdownItem {
    id: number;
    label: string;
    value: number;
    icon?: string;
}

const validationErrors = useValidationStore()

const columns = ref<DataTableColumn[]>();
const users = ref<User[]>([])
const title = ref<string>('')
const description = ref<string>('')
const roles = ref<Role[]>()


interface UserRequest {
    id?: number;
    name: string;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
}

const roleOptions = computed(() => {
    return roles.value?.map((role) => ({
        id: role.id,
        label: role.name,
        value: role.id,
        icon: 'mdi:account-group'
    })) as DropdownItem[]
})

const getUsers = async () => {
    const response = await UserRepository.getUsers()
    users.value = response.data;
    columns.value = response.meta.columns;
    title.value = response.meta.title;
    description.value = response.meta.description;
}

const getRoles = async () => {
    const response = await RoleRepository.getRoles()
    roles.value = response.data;
}

onMounted(async () => {
    await getUsers()
    await getRoles()
})

const handleSearch = async (value: string) => {
    const response = await UserRepository.getUsers(value)

    users.value = response.data;
    columns.value = response.meta.columns;
    title.value = response.meta.title;
    description.value = response.meta.description;
}

const isModalOpen = ref(false)
const formData = ref<UserRequest>({
    id: 0,
    name: '',
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: '',
})

const openModal = (user: UserRequest | null) => {
    isModalOpen.value = true
    console.log(user)
    formData.value = user || {
        id: 0,
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: '',
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
const handleSubmit = async () => {
    try {
        const isUpdate = formData.value.id && formData.value.id > 0

        if (isUpdate) {
            await UserRepository.updateUser(formData.value.id.toString(), formData.value)
        } else {
            await UserRepository.createUser(formData.value)
        }

        validationErrors.clearErrors()
        isModalOpen.value = false
        await getUsers()
        resetForm()
    } catch (error) {
        // Validation errors are handled by the API interceptor
        console.error('Error submitting form:', error)
    }
}
</script>

<template>
    <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
        <header class="flex flex-col gap-2">
            <h1 class="text-2xl font-semibold text-contrast">
                {{ title }}
            </h1>
            <p class="text-sm text-contrast/70">
                {{ description }}
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

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">
        <DataTable v-if="columns && users" :columns="columns" :data="users" :loading="false" has-search
            @search="handleSearch" :appends="[{ key: 'actions', label: 'actions', slot: 'actions' }]">
            <template #role="{ row }">
                <span class="px-2 py-1 text-sm rounded-full bg-primary/10 text-primary font-medium">
                    {{ row.role?.name }}
                </span>
            </template>

            <template #actions="{ row }">
                <div class="flex gap-2">
                    <Button @click="openModal(row)" icon="mdi:pencil" variant="primary" />
                </div>
            </template>

        </DataTable>

        <div v-else>
            <p class="text-center text-sm text-contrast/70">
                {{ $t('common.noData') }}
            </p>
        </div>
    </div>


</template>
