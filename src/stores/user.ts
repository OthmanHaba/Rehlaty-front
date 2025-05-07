import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
    const user = ref({
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        token: '1234567890',
    })

    return { user }
})
