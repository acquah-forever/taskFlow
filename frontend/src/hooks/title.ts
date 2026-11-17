import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTitle, createTitle, updateTitle, deleteTitle, type TitleInput } from "../api/title"; 


export function useGetTitle() {
    return useQuery({
        queryKey: ['title'],
        queryFn: getTitle,
        retry: false,
        refetchOnWindowFocus: false
    })
};

export function useCreateTitle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: TitleInput) => createTitle(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['title']
            })
        }
    })
};

export function useUpdateTitle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data} : {id: string, data:TitleInput}) => updateTitle(id,data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['title']
            })
        }
    })
};

export function useDeleteTitle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTitle(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['title']
            })
        }
    })


}