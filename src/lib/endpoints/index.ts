export const endpoints = {
    LOGIN: () => '/auth/login',
    LOGOUT: () => '/auth/logout',
    REGISTER: () => '/auth/register',
    USER: (id: string | number) => `/users/${id}`,
    USERS: () => '/users',
    PERMISSIONS: () => '/permissions',
    ROLES: () => '/roles',
    DASHBOARD: () => '/dashboard',
    SETTINGS: () => '/settings',
} as const

export default endpoints
