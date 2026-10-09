const API_URL = import.meta.env.VITE_API_URL

export interface User {
    id: string,
    email: string
};

export interface SignUpData {
    username: string,
    email: string,
    password: string
};

export interface LogInData {
    username: string,
    email: string
};

export interface ApiError {
    error: string
};


export async function handleResponse<T>(response: Response): Promise<T>{
    const data = await response.json();
    if(!response.ok) {
        throw new Error((data as ApiError).error || "Something went wrong")
    }
    return data
};

export async function getAuthenticatedUser(): Promise<User> {
    const response = await fetch(`${API_URL}/users`, {
        credentials : "include"
    })

    return handleResponse<User>(response)
};

export async function signUpUser(data: SignUpData): Promise<User>{
    const response = await fetch(`${API_URL}/users/signup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data),

    });

    return handleResponse<User>(response)

};

export async function logInUser(data: LogInData): Promise<User>{
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-type" : "application/json"
        },
        body: JSON.stringify(data),

    });

    return handleResponse<User>(response)

};

export async function logOutUser(): Promise<{message: string}>{
    const response = await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        credentials: "include",

    });

    return handleResponse<{message: string}>(response)
}


