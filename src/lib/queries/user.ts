import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query'
import { UserRepository } from '@/lib/repsitories/User'
import { RoleRepository } from '@/lib/repsitories/Role'
import type { UserRequest } from '@/types/user'
import type { ApiError } from '@/lib/api/helpers/ApiError'
import type { Ref } from 'vue'



export function useUserQuery(search: Ref<string>, options = {}) {
  return useQuery(queryOptions({
    queryKey: ['users', search],
    queryFn: () => UserRepository.getUsers(search.value),
    ...options,
  }))
}

export function useUserMutation(onSuccess: () => void, onError: (error: ApiError) => void)
 {
  return useMutation({
    mutationKey: ['users'],
    mutationFn: (user: UserRequest) => {
      if (user.id) {
        return UserRepository.updateUser(String(user.id), user)
      } else {
        return UserRepository.createUser(user)
      }
    },
    onSuccess,
    onError,
  })
}

export function useRoleQuery(search?: Ref<string>,options = {}) {
  return useQuery(queryOptions({
    queryKey: ['roles', search],
    queryFn: () => RoleRepository.getRoles(search?.value),
    ...options,
  }))
}
