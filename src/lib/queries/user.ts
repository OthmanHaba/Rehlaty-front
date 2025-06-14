import { useQuery, useMutation } from '@tanstack/vue-query'
import { UserRepository } from '@/lib/repsitories/User'
import { RoleRepository } from '@/lib/repsitories/Role'
import type { UserRequest } from '@/types/user'
import type { ApiError } from '@/lib/api/helpers/ApiError'
import type { Ref } from 'vue'



export function useUserQuery(search: Ref<string>) {
  return useQuery({
    queryKey: ['users', search],
    queryFn: () => UserRepository.getUsers(search.value),
  })
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

export function useRoleQuery() {
  return useQuery({
    queryKey: ['roles'],
    queryFn: () => RoleRepository.getRoles(),
  })
}
