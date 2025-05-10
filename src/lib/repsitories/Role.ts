import { endpoints } from '@/lib/endpoints'
import Api from '@/lib/api/base'
import type { Meta, Response } from '@/types'
import type { Role } from '@/types/User'

export const RoleRepository = {
    getRoles: async (search: string | null = null) => {
        const response = await Api.get<Response<Role[], Meta>>(endpoints.ROLES(), {
            params: {
                search,
            },
        })
        return response.data
    },
    getRole: async (id: string) => {
        const response = await Api.get<Response<Role, Meta>>(endpoints.ROLE(id))
        return response.data
    },
}
