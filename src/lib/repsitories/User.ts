import { endpoints } from '@/lib/endpoints'
import Api from '@/lib/api/base'
import type { Permission, User } from '@/types/User'
import type { Response, Meta } from '@/types'

export const UserRepository = {
    getUsers: async (search?: string) => {
        const response = await Api.get<Response<User[], Meta>>(endpoints.USERS(), {
            params: {
                search: search ?? '',
            },
        })
        return response.data
    },
    getUser: async (id: string) => {
        const response = await Api.get(endpoints.USER(id))
        return response.data
    },
}
