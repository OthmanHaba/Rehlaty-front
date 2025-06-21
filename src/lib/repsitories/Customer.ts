import { endpoints } from '@/lib/endpoints'
import Api from '@/lib/api/base'
import type { Customer } from '@/types/Customer'
import type { Response, Meta } from '@/types'

export const CustomerRepository = {
    getCustomers: async (search?: string) => {
        return await Api.get<Response<Customer[], Meta>>(endpoints.CUSTOMERS(), {
            params: {
                search: search ?? '',
            },
        })
    },

    getCustomer: async (id: number) => {
        const response = await Api.get(endpoints.CUSTOMER(id))
        return response.data
    },

    createCustomer: async (data: Customer) => {
        const response = await Api.post(endpoints.CUSTOMER_CREATE(), data)
        return response.data
    },

    updateCustomer: async (id: string | number, data: Customer) => {
        const response = await Api.put(endpoints.CUSTOMER(id), data)
        return response.data
    },
}
