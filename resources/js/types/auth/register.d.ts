export interface RegisterForm {
    name: string;
    username: string;
    address: string;
    birth_date: string;
    birth_place: string;
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