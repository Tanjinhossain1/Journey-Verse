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


export interface MyProfileType  {
    id: number;
    name: string | null;
    email: string | null;
    location: string | null;
    bio: string | null;
    travelStyle: string | null;
    favoriteDestination: string | null;
    bucketList: string | null;
    createdAt: Date;
    updatedAt: Date;
}