import { endpoints } from '@/lib/endpoints'
import Api from '@/lib/api/base'
import type { User } from '@/types/User/index'
import type { Response, Meta } from '@/types'
import type { UserRequest } from '@/types/user'
// interface UserRequest {
//     id?: number
//     name: string
//     username: string
//     email: string
//     password: string
//     password_confirmation: string
//     role: string
// }

export const UserRepository = {
    getUsers: async (search?: string) => {
        return  await Api.get<Response<User[], Meta>>(endpoints.USERS(), {
            params: {
                search: search ?? '',
            },
        });
    },
    getUser: async (id: number) => {
        const response = await Api.get(endpoints.USER(id))
        return response.data
    },

    createUser: async (data: UserRequest) => {
        const response = await Api.post(endpoints.USERS(), data)
        return response.data
    },

    updateUser: async (id: string, data: UserRequest) => {
        const response = await Api.put(endpoints.USER(id), data)
        return response.data
    },
}
