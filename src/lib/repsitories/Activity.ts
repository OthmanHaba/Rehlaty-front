import Api from '@/lib/api/base.ts'
import endpoints from '@/lib/endpoints'
import type { Meta, Response , Activity} from '@/types'


export const ActivityRepository = {
    fetchAll: async () => {
        const response = await Api.get<Response<Activity[],Meta>>(endpoints.ACTIVITIES())
        return response.data
    },

}
