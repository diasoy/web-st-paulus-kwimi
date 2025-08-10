export interface RegisterForm {
    name: string;
    username: string;
    email: string;
    phone_number: string;
    address: string;
    birth_date: string;
    gender: 'male' | 'female';
    community_id: number;
    password: string;
    password_confirmation: string;
    role_id?: number;
}

export interface Community {
    id: number;
    name: string;
}