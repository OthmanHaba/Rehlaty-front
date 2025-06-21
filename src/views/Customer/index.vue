<script setup lang="ts">
import DataTable from '@/components/Shared/DataTable.vue'
import { ref } from 'vue'
import Button from '@/components/Shared/Button.vue'
import Modal from '@/components/Shared/Modal.vue'
import { useCustomerQuery } from '@/lib/queries/customer'
import Pagination from '@/components/Shared/Pagination.vue'
import type { Customer } from '@/types/Customer'

const search = ref('')
const page = ref(1)

const { data, isLoading, refetch } = useCustomerQuery(search, { enabled: true })

const handleSearch = (value: string) => {
  search.value = value
  refetch()
}

const handlePageChange = (_page: number) => {
  page.value = _page
  refetch()
}

const isViewModalOpen = ref(false)
const selectedCustomer = ref<Partial<Customer> | null>(null)

const openCustomerModal = (customer: Customer) => {
  selectedCustomer.value = customer
  isViewModalOpen.value = true
}

</script>

<template>
  <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
    <header class="flex flex-col gap-2">
      <h1 class="text-2xl font-semibold text-contrast">
        {{ $t('app.pages.title', { title: $t('app.pages.customers') }) }}
      </h1>
      <p class="text-sm text-contrast/70">
        {{ $t('common.description', { description: $t('app.pages.customers') }) }}
      </p>
      <div class="flex justify-end">
        <router-link to="customers/create">
          <Button icon="mdi:plus" variant="primary" :label="$t('common.add')" />
        </router-link>
      </div>
    </header>
  </div>

  <div class="mt-4 border p-2 border-primary/10 shadow-xs bg-white dark:bg-dark-700">
    <DataTable :columns="data?.data.meta?.columns ?? []" :data="data?.data.data ?? []" :loading="isLoading"
      has-search @search="handleSearch" :appends="[{ key: 'actions', label: 'actions', slot: 'actions' }]" >

      <template #actions="{ row }">
        <div class="flex gap-2">
          <!-- <router-link :to="`/customers/edit/${row.id}`">
            <Button icon="mdi:pencil" variant="primary" :label="$t('common.edit')" />
          </router-link> -->
          <Button icon="mdi:eye" variant="outline" :label="$t('common.view')" @click="openCustomerModal(row)" />
        </div>
      </template>

    </DataTable>

    <Pagination v-if="!isLoading && data?.data.meta" :pagination="data.data.meta" @page-change="handlePageChange" />
  </div>

  <Modal v-model="isViewModalOpen" size="xl" :title="$t('common.view')" :description="$t('customer.details')"  @close="isViewModalOpen = false" no-footer>
    <div class="space-y-3 text-sm">
      <div><strong>{{ $t('customer.name') }}:</strong> {{ selectedCustomer?.name }}</div>
      <div><strong>{{ $t('customer.phone') }}:</strong> {{ selectedCustomer?.phone }}</div>
      <div><strong>{{ $t('customer.gender') }}:</strong> {{ selectedCustomer?.gender }}</div>
      <div><strong>{{ $t('customer.passportNumber') }}:</strong> {{ selectedCustomer?.passportNumber }}</div>
      <div>
        <strong>{{ $t('customer.passportImage') }}:</strong>
        <div v-if="selectedCustomer?.passportImage">
            <img :src="selectedCustomer.passportImage" alt="Passport Image" class="max-w-full max-h-60 rounded-md" />
        </div>
        <div v-else>
            {{ $t('common.noImage') }}
        </div>
    </div>
    </div>
  </Modal>
</template>
