const API_URL = import.meta.env.VITE_API_URL?.trim();
if(!API_URL) throw new Error("VITE_API_URL is not set");

export interface Profile {
    _id: string,
    user: string,
    position: string,
    bio: string,
    createdAt: string,
    updatedAt: string
};

export type ProfileInput = Omit<Profile, "id" | "user" | "createdAt" | "updatesAt">;

export async function getProfile(): Promise<Profile | null> {
    const response = await fetch(`${API_URL}/profile`, {
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error ("Failed to get Profile. Try again later")
    };

    return response.json()
};

export async function createProfile(data: ProfileInput): Promise<Profile> {
    const response = await fetch(`${API_URL}/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)

    })
    if(!response.ok) {
        throw new Error("Failed to create Profile. Try again later")
    }

    return response.json()
};

export async function updateProfile(id: string, data:ProfileInput): Promise<Profile> {
    const response = await fetch(`${API_URL}/profile/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if(!response.ok) {
        throw new Error("Failed to update Profile. Try again later")
    };

    return response.json()
}