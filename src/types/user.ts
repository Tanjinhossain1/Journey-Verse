export interface UserType  {
    id: number;
    fullName: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface User {
    id: string; // Change this to string if your user ID is a string
    email: string;
    fullName: string;
    role: string;
    password: string;
    name?: string;
}