import Api from '@/lib/api/base.ts'
import type { Group, Meta, Response } from '@/types'
import endpoints from '@/lib/endpoints'

export const GroupRepository = {
    fetchAll: async (params?: null | Array<string> | object) => {
        const res = await Api.get<Response<Group[], Meta>>(
            endpoints.GROUPS(),
            {
                params: {
                    ...params,
                },
            },
        )
        return res.data
    },
}
