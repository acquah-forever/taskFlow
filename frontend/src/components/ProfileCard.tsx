import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'
import { useGetProfile } from '../hooks/profile';
import { ClipLoader } from "react-spinners";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from 'react';
import { motion } from "motion/react";

type ProfileCardProps = {
    handleClick: (index: number) => void;
};

const ProfileCard = ({ handleClick }: ProfileCardProps) => {
    const { data: user, isLoading: isProfileLoading } = useAuthenticatedUser()
    const { data: profile } = useGetProfile(user?._id);
    const { mutate: logOut, isPending } = useLogout();
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(cardRef, () => handleClick(null));



    function handleClick1() {
        logOut(undefined, {
            onSuccess: () => {
                navigate('/login')
            }
        })
    }

    if (!user) return null;

    if (isProfileLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ClipLoader size={37} color="black" />
            </div>
        )
    }

    const parent = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.1 } }
    };

    const children = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, } }
    };

    return (
            <motion.div variants={parent} initial="hidden" animate="visible" ref={cardRef} className='hidden absolute z-50 top-12 right-0 sm:flex justify-end text-black'>
                <div className="card bg-base-100 w-60 sm:w-70">
                    <div className="card-body">
                        <motion.div variants={children} className='flex justify-between'>
                            <h1 className='uppercase text-xs text-slate-500 font-semibold'>Account</h1>
                            <button type='button' aria-label='Close account menu' onClick={() => handleClick(2)}>
                                <X className='cursor-pointer' size={20} />
                            </button>
                        </motion.div>
                        <motion.div variants={children} className='flex space-x-2'>
                            <div className='flex items-center justify-center border border-white w-12 h-12 rounded-full bg-slate-700' >
                                <span className='cursor-pointer text-white'>{user.username.slice(0, 2)}</span>
                            </div>
                            <div>
                                <h1 className='text-sm'>{user.username}</h1>
                                <h1 className='text-sm'>{user.email}</h1>
                            </div>
                        </motion.div>
                        <motion.div variants={children} className='flex items-center justify-between mt-2'>
                            <h1 className='font-semibold text-sm'>TaskFlow</h1>
                            <button className='cursor-pointer px-4 border-black border-2 py-1 text-white rounded-lg bg-sky-600 text-sm' onClick={() => handleClick(3)}>{!profile ? "Create Profile" : "Edit Profile"}</button>
                        </motion.div>
                        {isProfileLoading ? (
                            <ClipLoader size={30} color="black" />
                        ) : profile ? (
                            <motion.div variants={children} className='mt-3'>
                                <p>{profile.position}</p>
                                <p>{profile.bio}</p>
                            </motion.div>
                        ) : (
                            <motion.p variants={children}>No profile information available.</motion.p>
                        )}
                        <div className='divider'></div>
                        {!isPending && user &&
                            <motion.div variants={children} className='max-w-2xl w-full'>
                                <button type='button' className='rounded-md cursor-pointer bg-linear-to-br from-green-400 to-green-800 py-3 px-7 text-white' onClick={handleClick1}>Log out</button>
                            </motion.div>
                        }
                    </div>
                </div>
            </motion.div>
    )

}


export default ProfileCard
