import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getProfile, createProfile, updateProfile, type ProfileInput } from "../api/profile";

export function useGetProfile(userId?: string) {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: getProfile,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!userId
        // prevents profile request from running before the authenticated user has been retrieved.
    })
};

export function useCreateProfile() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ProfileInput) => createProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile']
            })
        }
    })
};

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data} : {id: string, data: ProfileInput}) => updateProfile(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile']
            })
        }
    })
};