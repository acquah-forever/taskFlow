import { useGetProfile, useCreateProfile, useUpdateProfile } from '../hooks/profile';
import { useAuthenticatedUser } from '../hooks/users';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { X } from "lucide-react";
import { motion } from "motion/react";


type EditProfileProps = {
    handleClick: (index: number) => void;
};

interface FormValue {
    position: string,
    bio: string
}

const parent = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.3 } }
};

const children = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.15, } }
};

const EditProfile = ({ handleClick }: EditProfileProps) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValue>();
    const { data: user } = useAuthenticatedUser();
    const { data: profile, isLoading: isProfileLoading } = useGetProfile(user?._id);
    const { mutate: createProfile, isPending: isCreating } = useCreateProfile();
    const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null)
    const isPending = isCreating || isUpdating;

    function OnSubmit(data: FormValue) {
        setSuccessMessage(null);
        setSubmitError(null);
        if (!user?._id) {
            setSubmitError("You must be logged in to create a profile")
            return;
        }
        if (isProfileLoading) return;
        if (profile?._id) {
            updateProfile(
                { data, id: profile._id }, {
                onSuccess: () => {
                    setSuccessMessage("Profile updated successfully");
                    setTimeout(() => {
                        setSuccessMessage("");
                    }, 4000);
                },
                onError: () => {
                    setSubmitError("Failed to update profile")
                }
            }
            )
        } else {
            createProfile(data, {
                onSuccess: () => {
                    setSuccessMessage("Profile created successfully");
                    setTimeout(() => {
                    setSuccessMessage("");
                    }, 4000);

                },
                onError: () => {
                    setSubmitError("Failed to create profile")
                }
            })

        }
    }

    return (
        <motion.div variants={parent} initial="hidden" animate="visible" className='w-full'>
            <motion.div variants={children} className='mb-6 flex w-full items-start justify-between gap-4 sm:mb-7'>
                <h1 className='text-lg font-semibold sm:text-xl'>Profile and Visibility</h1>
                <X className='cursor-pointer' onClick={() => handleClick(0)} />
            </motion.div>
            <motion.div variants={children} className='mb-8 flex max-w-2xl items-center justify-center sm:mb-12'>
                <img className='w-full' src="https://trello.com/assets/580c9958c13d47ad0daa.svg" alt="profile" />
            </motion.div>
            <motion.h2 variants={children} className='mb-5 text-lg font-semibold sm:mb-7 sm:text-xl'>Manage your personal information</motion.h2>
            <motion.div variants={children} className='mb-5 space-y-3 wrap-break-word border bg-slate-300 p-3 text-sm text-slate-800 sm:p-4'>
                <p>This is an TaskFlow account. Edit your personal information and visibility settings through your TaskFlow profile.</p>
                <p>To learn more, view our <span className='text-sky-600 underline'>Terms of Service</span> or <span className='text-sky-600 underline'>Privacy Policy</span>.</p>
            </motion.div>
            <motion.h2 variants={children} className='font-semibold mb-3'>About</motion.h2>
            <motion.p variants={children} className='mb-6 text-sm sm:mb-7'>Required fields are marked with asterik <span className='text-red-500'>*</span></motion.p>
            <motion.form variants={children} className='w-full' onSubmit={handleSubmit(OnSubmit)}>
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
                    <button type='submit' disabled={isPending || isProfileLoading} className="cursor-pointer bg-sky-500 px-3 py-2 rounded-md text-white">{isPending ? "Saving" : "Save"}</button>
                </div>
                {successMessage && <motion.p variants={children} className='text-sm text-green-500'>{successMessage}</motion.p>}
                {submitError && <motion.p variants={children} className='text-sm text-red-500'>{submitError}</motion.p>}
            </motion.form>
        </motion.div>

    )
}
export default EditProfile
