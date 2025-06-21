<script setup lang="ts">
import FormWrapper from '@/components/Shared/From/FormWrapper.vue'
import FormInput from '@/components/Shared/From/FormInput.vue'
import DropDown from '@/components/Shared/DropDown.vue'
import { ref, computed } from 'vue'
import { useCustomerMutation } from '@/lib/queries/customer'
import { useRouter } from 'vue-router'
import { useToast } from '@/composables/useToast'
import type { Customer } from '@/types/Customer'

const router = useRouter()
const { error } = useToast()

const formData = ref<Partial<Customer>>({
  name: '',
  phone: '',
  gender: 'male',
  passportNumber: '',
  passportImage: ''
})

const genderOptions = [
  { id: 'male', label: 'ذكر', value: 'male' },
  { id: 'female', label: 'أنثى', value: 'female' }
]

const createCustomerMutation = useCustomerMutation(
  () => router.push('/customers'),
  (apiError) => error(apiError.message || 'Failed to create customer')
)

const isPending = computed(() => createCustomerMutation.isPending.value)

// عند اختيار صورة
const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    try {
      // هنا حولت الصورة إلى base64 وحفظتها في formData.passportImage
      formData.value.passportImage = await toBase64(file)
    } catch (err) {
      error('Failed to load image')
    }
  }
}

const submit = () => {
  createCustomerMutation.mutate(formData.value)
}
</script>

<template>
  <div class="border-b p-2 border-primary/10 bg-white dark:bg-dark-700">
      {{ $t('customer.add') }}
  </div>

  <div class="mt-4 border p-2 border-primary/10 shadow-xs bg-white dark:bg-dark-700">
    <FormWrapper @submit.prevent="submit">
      <FormInput v-model="formData.name" :label="$t('customer.name')"/>
      <FormInput v-model="formData.phone" :label="$t('customer.phone')"/>
      <DropDown v-model="formData.gender" :items="genderOptions" :label="$t('customer.gender')"/>
      <FormInput v-model="formData.passportNumber" :label="$t('customer.passportNumber')"/>
      <!-- <FormInput v-model="formData.passportImage" :label="$t('customer.passportImage')" -->

      <!--  رفع الصورة -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          {{ $t('customer.passportImage') }}
        </label>
        <input type="file" accept="image/*" @change="onFileChange"
          class="block w-full text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/80"/>
      </div>

      <div class="flex justify-end mt-4">
        <button
          type="submit"
          class="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition duration-200"
          :disabled="isPending"
        >
          {{ $t('common.save') }}
        </button>
      </div>
    </FormWrapper>
  </div>
</template>
