import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import { CustomerRepository } from '@/lib/repsitories/Customer'
import type { Customer } from '@/types/Customer'
import type { ApiError } from '@/lib/api/helpers/ApiError'
import type { Ref } from 'vue'

export function useCustomerQuery(search: Ref<string>, options = {}) {
  return useQuery(queryOptions({
    queryKey: ['customers', search],
    queryFn: () => CustomerRepository.getCustomers(search.value),
    ...options,
  }))
}

export function useCustomerMutation(
  onSuccess: () => void,
  onError: (error: ApiError) => void
) {
  return useMutation({
    mutationKey: ['customers'],
    mutationFn: (customer: Customer) => {
      if (customer.id) {
        return CustomerRepository.updateCustomer(customer.id, customer)
      } else {
        return CustomerRepository.createCustomer(customer)
      }
    },
    onSuccess,
    onError,
  })
}
