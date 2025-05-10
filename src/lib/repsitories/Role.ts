import { endpoints } from '@/lib/endpoints'
import Api from '@/lib/api/base'
import type { Meta, Response } from '@/types'
import type { Permission, Role } from '@/types/User'

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

    getPermissions: async () => {
        const response = await Api.get<Permission[]>(endpoints.PERMISSIONS())
        return response.data
    },

    createRole: async (data: { id?: number; name: string; permissions: number[] }) => {
        const response = await Api.post(endpoints.ROLES(), data)
        return response.data
    },

    updateRole: async (data: { id: number; name: string; permissions: number[] }) => {
        const response = await Api.put(endpoints.ROLE(data.id), data)
        return response.data
    },
}
