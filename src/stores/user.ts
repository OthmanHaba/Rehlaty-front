import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/Auth'

export const useUserStore = defineStore('user', () => {
    const user = ref<User | null>(null)

    const setUser = (_user: User) => {
        user.value = _user
    }

    const getUser = () => {
        return user.value
    }

    return { user, setUser, getUser }
})
