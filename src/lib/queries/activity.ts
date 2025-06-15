import { ActivityRepository } from '@/lib/repsitories/Activity.ts'
import { queryOptions, useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export function useActivityQuery(search: Ref<string>, options = {}) {
  return useQuery(queryOptions({
    queryKey: ['activities', search.value],
    queryFn: () => ActivityRepository.fetchAll(),
    retry: 1,
    ...options,
  }))
}
