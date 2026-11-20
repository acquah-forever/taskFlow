const API_URL = import.meta.env.VITE_API_URL?.trim();
if(!API_URL) throw new Error("VITE_API_URL is not set");

export interface Title  {
    _id: string,
    user: string,
    title: string,
    description: string,
    createdAt: string,
    updatedAt: string
}

export type TitleInput = Omit<Title, "_id" | "user" | "createdAt" | "updatedAt">

export async function getTitle(): Promise<Title[]> {
    const response = await fetch(`${API_URL}/title`, {
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error("Failed to fetch Title.")
    }
    
    return response.json()
}

export async function createTitle(data: TitleInput): Promise<Title> {
    const response = await fetch(`${API_URL}/title`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })
    if(!response.ok) {
        throw new Error("Failed to create Title")
    }
    return response.json()
};

export async function updateTitle(id: string, data:TitleInput): Promise<Title> {
    const response = await fetch(`${API_URL}/title/${id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data)
    })
        if(!response.ok) {
        throw new Error("Failed to update Title")
    }
    return response.json()
};

export async function deleteTitle(id: string ) {
    const response = await fetch(`${API_URL}/title/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    if(!response.ok) {
        throw new Error("Failed to delete Title")
    }
    return response.json()
};
