import { useGetProfile, useCreateProfile, useUpdateProfile } from '../hooks/profile';
import { useAuthenticatedUser } from '../hooks/users';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { X } from "lucide-react"

type EditProfileProps = {
    handleClick: (index: number) => void;
};

interface FormValue {
    position: string,
    bio: string
}

const EditProfile = ({ handleClick }: EditProfileProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValue>();
    const { data: user } = useAuthenticatedUser();
    const { data: profile } = useGetProfile();
    const { mutate: createProfile, isPending: isCreating } = useCreateProfile();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null)
    const isPending = isCreating || isUpdating;

    function OnSubmit(data: FormValue) {

        if (profile._id === user._id) {
            updateProfile(
                { data, id: profile._id }, {
                onSuccess: () => {
                    setSuccessMessage("Profile updated successfully")
                },
                onError: () => {
                    setSubmitError("Failed to update profile")
                }
            }
            )
        } else {
            createProfile(data, {
                onSuccess: () => {
                    setSuccessMessage("Profile created successfully")
                },
                onError: () => {
                    setSubmitError("Failed to create profile")
                }
            })

        }
    }

    return (
        <div className='w-full'>
            <div className='mb-6 flex w-full items-start justify-between gap-4 sm:mb-7'>
                <h1 className='text-lg font-semibold sm:text-xl'>Profile and Visibility</h1>
                <X className='cursor-pointer' onClick={() => handleClick(0)} />
            </div>
            <div className='mb-8 flex max-w-2xl items-center justify-center sm:mb-12'>
                <img className='w-full' src="https://trello.com/assets/580c9958c13d47ad0daa.svg" alt="profile" />
            </div>
            <h2 className='mb-5 text-lg font-semibold sm:mb-7 sm:text-xl'>Manage your personal information</h2>
            <div className='mb-5 space-y-3 wrap-break-word border bg-slate-300 p-3 text-sm text-slate-800 sm:p-4'>
                <p>This is an TaskFlow account. Edit your personal information and visibility settings through your TaskFlow profile.</p>
                <p>To learn more, view our <span className='text-sky-600 underline'>Terms of Service</span> or <span className='text-sky-600 underline'>Privacy Policy</span>.</p>
            </div>
            <h2 className='font-semibold mb-3'>About</h2>
            <p className='mb-6 text-sm sm:mb-7'>Required fields are marked with asterik <span className='text-red-500'>*</span> </p>
            <form className='w-full' onSubmit={handleSubmit(OnSubmit)}>
                <div className='flex flex-col space-y-2 mb-5'>
                    <label className='font-semibold' htmlFor="position">Position<span className='text-red-500'>*</span></label>
                    <input id='position' className='w-full min-w-0 rounded-md border bg-white p-2 outline-none' type="text"{...register('position', { required: "Indicte your position" })} />
                    {errors.position && <p className='text-xs text-red-500'>{errors.position.message}</p>}
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='font-semibold' htmlFor="bio">Bio<span className='text-red-500'>*</span></label>
                    <input id='bio' className='w-full min-w-0 rounded-md border bg-white p-2 outline-none' type="text"{...register("bio", { required: "State your bio" })} />
                    {errors.bio && <p className='text-xs text-red-500'>{errors.bio.message}</p>}
                </div>
                <div className='flex justify-end mt-7'>
                    <button type='submit' disabled={isPending} className="btn btn-info text-white">{isPending ? "Saving" : "Save"}</button>
                </div>
                {successMessage && <p className='text-sm text-green-500'>{successMessage}</p>}
                {submitError && <p className='text-sm text-red-500'>{submitError}</p>}
            </form>
        </div>

    )
}
export default EditProfile
