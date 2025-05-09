import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/Auth'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)
    const router = useRouter()

    const setUser = (_user: User) => {
        user.value = _user
    }

    const getUser = () => {
        return user.value
    }

    const logout = () => {
        user.value = null
        localStorage.removeItem('token')
        router.push('/login')
    }

    return { user, setUser, getUser, logout }
})
