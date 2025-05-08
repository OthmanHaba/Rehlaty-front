import { Auth } from "@/lib/repsitories/Auth";
import type { LoginRequest } from '@/types/Auth'


const auth = Auth.newAuth();

export const authService = {
    login: async (data : LoginRequest): Promise<void> => {
        return new Promise((resolve, reject) => {
            auth
                .login(data.username, data.password)
                .then(() => {
                    resolve();
                })
                .catch((error) => {
                    console.error("Login error:", error);
                    reject(error);
                });
        });
    },
}
