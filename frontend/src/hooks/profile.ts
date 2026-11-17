import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { getProfile, createProfile, updateProfile, type ProfileInput } from "../api/profile";

export function useGetProfile() {
    return useQuery({
        queryKey: ['profile'],
        queryFn: getProfile,
        refetchOnWindowFocus: false,
        retry: false
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
                queryKey: ['profiile']
            })
        }
    })
};