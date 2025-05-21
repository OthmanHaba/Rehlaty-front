export const endpoints = {
    LOGIN: () => '/auth/login',
    LOGOUT: () => '/auth/logout',
    REGISTER: () => '/auth/register',
    USER: (id: string | number) => `/users/${id}`,
    USERS: () => '/users',
    PERMISSIONS: () => '/permissions',
    ROLES: () => '/roles',
    ROLE: (id: string | number) => `/roles/${id}`,
    ACTIVITIES: () => '/activities',
    GROUPS: () => '/groups',
    GROUP: (id: string | number) => `/groups/${id}`,
} as const

export default endpoints
