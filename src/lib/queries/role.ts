import { RoleRepository } from '@/lib/repsitories/Role';
import { useQuery, useMutation, queryOptions } from '@tanstack/vue-query';
import type { ApiError } from '@/lib/api/helpers/ApiError'
import type { Role } from '@/types/User/index'

export function usePermissionQuery(options = {}) {
  return useQuery(queryOptions({
      queryKey: ['permissions'],
      queryFn: () => RoleRepository.getPermissions(),
      ...options,
    }))
}

export function useRoleMutation(onSuccess: () => void, onError: (error: ApiError) => void)
{
  return useMutation({
    mutationKey: ['roles'],
    mutationFn: (roleData: Role) => {
      if (roleData.id) {
        return RoleRepository.updateRole({
          id: roleData.id,
          name: roleData.name,
          permissions: roleData.permissions?.map((p) => p.id) || [],
        })
      } else {
        return RoleRepository.createRole({
          name: roleData.name,
          permissions: roleData.permissions?.map((p) => p.id) || [],
        })
      }
    },
    onSuccess,
    onError,
  })
}
