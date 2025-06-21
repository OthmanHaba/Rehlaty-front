<script lang="ts" setup>
import { ref, computed } from 'vue';
import Button from '@/components/Shared/Button.vue';
import Modal from '@/components/Shared/Modal.vue';
import FormWrapper from '@/components/Shared/From/FormWrapper.vue';
import FormInput from '@/components/Shared/From/FormInput.vue';
import DataTable from '@/components/Shared/DataTable.vue';
import CheckBox from '@/components/Shared/CheckBox.vue';
import type { Role } from '@/types/User/index';
import { usePermissionQuery, useRoleMutation } from '@/lib/queries/role'
import { useRoleQuery} from '@/lib/queries/user'
import { useToast } from '@/composables/useToast';
import type { ApiError } from '@/lib/api/helpers/ApiError';

const isModalOpen = ref<boolean>(false)
const search = ref<string>('')

const { error } = useToast();

const formData = ref<Role>({
    id: 0,
    name: '',
    permissions: []
});

// Fetch roles with search parameter
const {
    data: rolesData,
    isLoading: isRolesLoading,
    refetch: refetchRoles
      } = useRoleQuery(search)

// Fetch permissions
const { data: permissionsData } = usePermissionQuery({ enabled: true,  })

const isCheckAll = ref<boolean>(false);

const roleMutation = useRoleMutation(
    () => {
        isModalOpen.value = false
        refetchRoles()
    },
    (_error: ApiError) => {
        error(_error.message ?? 'Failed to create role')
    }
)

const roles = computed(() => rolesData.value?.data || []);
const columns = computed(() => rolesData.value?.meta?.columns || []);
const title = computed(() => rolesData.value?.meta?.title || '');
const description = computed(() => rolesData.value?.meta?.description || '');
const permissions = computed(() => permissionsData.value?.data || []);

const selectedPermissionIds = computed({
    get: () => formData.value.permissions?.map(p => p.id) || [],
    set: (value: number[]) => {
        formData.value.permissions = permissions.value.filter(p => value.includes(p.id));
    }
});

const handleCheckAll = () => {
    if (isCheckAll.value) {
        selectedPermissionIds.value = permissions.value.map(p => p.id);
    } else {
        selectedPermissionIds.value = [];
    }
}

const handleSearch = (value: string) => {
    search.value = value;
    refetchRoles();
}

const handleSubmit = () => {
    roleMutation.mutate(formData.value);
}

const openModal = (value: Role | null) => {
    if (value) {
        formData.value = {
            id: value.id,
            name: value.name,
            permissions: value.permissions
        }
    } else {
        formData.value = {
            id: 0,
            name: '',
            permissions: []
        }
    }
    isModalOpen.value = true;
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

            <Modal no-footer v-model="isModalOpen" title="My Modal" @close="isModalOpen = false">
                <FormWrapper @submit.prevent="handleSubmit">
                    <FormInput :label="$t('role.name')" v-model="formData.name" />

                    <div>
                        <CheckBox v-model="isCheckAll" :label="$t('role.allPermissions')" :disabled="false"
                            :label-class="''" @change="handleCheckAll">
                            <template #label>
                                <span class="text-sm text-contrast/70">
                                    {{ $t('role.allPermissions') }}
                                </span>
                            </template>
                        </CheckBox>
                    </div>
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
                        <Button icon="mdi:plus" variant="primary" :label="$t('common.add')" />
                    </template>
                </FormWrapper>
            </Modal>
        </header>
    </div>

    <div class="mt-4 border p-2 border-primary/10  shadow-xs bg-white dark:bg-dark-700">
        <DataTable :columns="columns" :data="roles as any[]" :loading="isRolesLoading" has-search @search="handleSearch"
            :appends="[{ key: 'actions', label: 'Actions', slot: 'actions' }]">
            <template #actions="{ row }">
                <Button @click="openModal(row as Role)" icon="mdi:pencil" variant="secondary" />
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
    </div>
</template>
