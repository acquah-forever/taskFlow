import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type User, getAuthenticatedUser, signUpUser, logInUser, logOutUser, type SignUpData, type LogInData } from "../api/users"

export function useAuthenticatedUser() {
    return useQuery({
        queryKey: ["authenticatedUser"],
        queryFn: getAuthenticatedUser,
        retry: false,
        refetchOnWindowFocus: false
    });
};

export function useSignUp() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: SignUpData) => signUpUser(data),
        onSuccess: (User) => {
            queryClient.setQueryData<User>(['authenticatedUser'], User)

        }

    })
};

export function useLogIn() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LogInData) => logInUser(data),
        onSuccess: (User) => {
            queryClient.setQueryData<User>(['authenticatedUser'], User)

        }

    })
};

export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logOutUser,
        onSuccess: () => {
            queryClient.removeQueries({
                queryKey: ["authenticatedUser"],
            });
        },
    });
}