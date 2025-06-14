import { ActivityRepository } from '@/lib/repsitories/Activity.ts'
import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'

export function useActivityQuery(search: Ref<string>) {
  return useQuery({
    queryKey: ['activities', search.value],
    queryFn: () => ActivityRepository.fetchAll(),
    retry: 1,
  })
}
