<script lang="ts" setup>
import { RoleRepository } from '@/lib/repsitories/Role';
import type { DataTableColumn } from '@/types';
import type { Role } from '@/types/User';
import { onMounted, ref, computed } from 'vue';
import Button from '@/components/Shared/Button.vue';
import Modal from '@/components/Shared/Modal.vue';
import FormWrapper from '@/components/Shared/From/FormWrapper.vue';
import FormInput from '@/components/Shared/From/FormInput.vue';
import DataTable from '@/components/Shared/DataTable.vue';
import CheckBox from '@/components/Shared/CheckBox.vue';
import type { Permission } from '@/types/User';

const title = ref<string>('')
const description = ref<string>('')
const columns = ref<DataTableColumn[]>()
const roles = ref<Role[]>()
const isModalOpen = ref<boolean>(false)
const permissions = ref<Permission[]>([]);

const formData = ref<Role>({
    id: 0,
    name: '',
    permissions: []
});

const selectedPermissionIds = computed({
    get: () => formData.value.permissions?.map(p => p.id) || [],
    set: (value: number[]) => {
        formData.value.permissions = permissions.value.filter(p => value.includes(p.id));
    }
});

const handleSearch = async (value: string) => {
    const response = await RoleRepository.getRoles(value)
    roles.value = response.data
    columns.value = response.meta.columns
    title.value = response.meta.title
    description.value = response.meta.description
}

const getPermissions = async () => {
    const response = await RoleRepository.getPermissions()
    permissions.value = response.data
}

const getRoles = async () => {
    const response = await RoleRepository.getRoles()
    roles.value = response.data
    columns.value = response.meta.columns
    title.value = response.meta.title
    description.value = response.meta.description
}

const handleSubmit = async () => {
    try {

        if (formData.value.id) {
            await RoleRepository.updateRole({
                id: formData.value.id,
                name: formData.value.name,
                permissions: formData.value.permissions?.map((p: Permission) => p.id) || []
            })
        } else {
            await RoleRepository.createRole({
                name: formData.value.name,
                permissions: selectedPermissionIds.value
            })
        }
        isModalOpen.value = false
        await getRoles()
    } catch (error) {
        console.log(error)
    }
}

const openModal = (value: Role | null) => {

    if (value) {
        formData.value = {
            id: value.id,
            name: value.name,
        }

        selectedPermissionIds.value = value?.permissions?.map((p: Permission) => p.id) || []

        console.log(value.permissions)

        formData.value.permissions = value.permissions
    }
    isModalOpen.value = true

    console.log(selectedPermissionIds.value)
    console.log(formData.value)
}

onMounted(async () => {
    await getPermissions()
    await getRoles()
})
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

            <Modal no-footer v-model="isModalOpen" title="My Modal" @close="isModalOpen = false">
                <FormWrapper @submit.prevent="handleSubmit">
                    <FormInput :label="$t('role.name')" v-model="formData.name" />

                    <div class="space-y-2 grid grid-cols-2 gap-2">
                        <CheckBox v-for="permission in permissions" :key="permission.id" v-model="selectedPermissionIds"
                            :value="permission.id" :multiple="true" :label="permission.name" :disabled="false"
                            :label-class="''">
                            <template #label>
                                <span class="text-sm text-contrast/70">
                                    {{ permission.name }}
                                </span>
                            </template>

                        </CheckBox>
                    </div>
                    <template #actions>
                        <Button @click="handleSubmit" icon="mdi:plus" variant="primary" :label="$t('common.add')" />
                    </template>
                </FormWrapper>
            </Modal>
        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">
        <DataTable v-if="columns && roles" :columns="columns"
            :data="roles as unknown as Record<string, string | number | boolean>[]" :loading="false" has-search
            @search="handleSearch" :appends="[{ key: 'actions', label: 'Actions', slot: 'actions' }]">
            <template #actions="{ row }">
                <Button @click="openModal(row)" icon="mdi:pencil" variant="secondary" />
            </template>

            <template #permissions="{ row }">
                <div class="flex flex-wrap gap-2">
                    <span v-for="permission in row.permissions" :key="permission.id"
                        class="text-sm text-contrast/70 rounded-full bg-primary/10 px-2 py-1">
                        {{ permission.name }}
                    </span>
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