import Api from '@/lib/api/base.ts'
import endpoints from '@/lib/endpoints'
import { useUserStore } from '@/stores/user'
import type { LoginResponse } from '@/types/Auth'
export class Auth {
    private static instance: Auth

    private constructor() {}

    public static newAuth(): Auth {
        if (!Auth.instance) {
            Auth.instance = new Auth()
        }
        return Auth.instance
    }

    public async login(username: string, password: string): Promise<void> {
        return new Promise((resolve, reject) => {
            Api.post<LoginResponse>(endpoints.LOGIN(), {
                username,
                password,
            })
                .then((response) => {
                    // Store token in local storage
                    localStorage.setItem('token', response.data.token)
                    const userStore = useUserStore()
                    userStore.setUser(response.data.user)
                    resolve()
                })
                .catch((error) => {
                    console.error('Login error:', error)
                    reject(error)
                })
        })
    }
}
