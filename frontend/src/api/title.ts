const API_URL = import.meta.env.VITE_API_URL?.trim();
if(!API_URL) throw new Error("VITE_API_URL is not set");

export interface Title {
    _id: string,
    user: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export type TitleInput = Omit<Title, "_id" | "user" | "createdAt" | "updatedAt">