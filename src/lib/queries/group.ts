import { GroupRepository } from '@/lib/repsitories/Group'
import { useQuery, useMutation } from '@tanstack/vue-query'
import type { Group } from '@/types'
import Api from '@/lib/api/base.ts'
import endpoints from '@/lib/endpoints'
import type { ApiError } from '@/lib/api/helpers/ApiError'

export function useGroupQuery(search: string, page: number) {
  return useQuery({
    queryKey: ['groups', search, page],
    queryFn: () =>
      GroupRepository.fetchAll({
        search,
        per_page: 10,
        page
      })
  })
}

export function useCreateGroupMutation(
  onSuccess: () => void,
  onError: (error: ApiError) => void
) {
  return useMutation({
    mutationFn: (groupData: Group) => {
      return Api.post(endpoints.GROUPS(), groupData)
    },
    onSuccess,
    onError,
  })
}
