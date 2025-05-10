export interface User {
    id: number
    name: string
    username: string
    email: string
    password?: string
    createdAt?: string
    updatedAt?: string
    role?: Role
    permissions?: Permission[]
}

export interface Role {
    id: number
    name: string
    permissions?: Permission[]
}

export interface Permission {
    id: number
    name: string
}
