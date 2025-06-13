import { ActivityRepository } from '@/lib/repsitories/Activity.ts'
import { useQuery } from '@tanstack/vue-query'

export function useActivityQuery(search: string) {
  return useQuery({
    queryKey: ['activities', search],
    queryFn: () => ActivityRepository.fetchAll(),
    retry: 1,
  })
}
