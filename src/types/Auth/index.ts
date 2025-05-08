interface User {
    id: string;
    name: string;
    username: string;
    email: string;
    role?: string;
    permissions?: Permission[];
}

interface Permission {
    id: string;
    name: string;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    user: User;
}

export type {
    User,
    LoginRequest,
    LoginResponse,
}
