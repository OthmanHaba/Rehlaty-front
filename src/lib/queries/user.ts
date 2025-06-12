import { useQuery, useMutation } from '@tanstack/vue-query'
import { UserRepository } from '@/lib/repsitories/User'
import { RoleRepository } from '@/lib/repsitories/Role'

interface UserRequest {
    id?: number
    name: string
    username: string
    email: string
    password: string
    password_confirmation: string
    role: string
}

export function useUserQuery(search: string) {
  return useQuery({
    queryKey: ['users', search],
    queryFn: () => UserRepository.getUsers(search),
  })
}

export function useUserMutation(onSuccess: () => void, onError: (error: any) => void)
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
