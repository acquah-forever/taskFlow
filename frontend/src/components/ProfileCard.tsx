import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'
import { useGetProfile } from '../hooks/profile';
import { ClipLoader } from "react-spinners";

type ProfileCardProps = {
    handleClick: (index: number) => void;
};

const ProfileCard = ({ handleClick }: ProfileCardProps) => {
    const { data: user, isLoading: isProfileLoading } = useAuthenticatedUser()
    const { data: profile } = useGetProfile();
    const { mutate: logOut, isPending } = useLogout();
    const navigate = useNavigate();


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

    return (
        <div className='hidden absolute top-12 right-0 sm:flex justify-end text-black'>
            <div className="card bg-base-100 w-60 sm:w-70">
                <div className="card-body">
                    <div className='flex justify-between'>
                        <h1 className='uppercase text-xs text-slate-500 font-semibold'>Account</h1>
                        <button type='button' aria-label='Close account menu' onClick={() => handleClick(2)}> <X className='cursor-pointer' /></button>
                    </div>
                    <div className='flex space-x-2'>
                        <div className='flex items-center justify-center border border-white w-12 h-12 rounded-full bg-slate-700' >
                            <span className='cursor-pointer text-white'>{user.username.slice(0, 2)}</span>
                        </div>
                        <div>
                            <h1 className='text-sm'>{user.username}</h1>
                            <h1 className='text-sm'>{user.email}</h1>
                        </div>
                    </div>
                    <div className='flex items-center justify-between mt-2'>
                        <h1 className='font-semibold text-sm'>TaskFlow</h1>
                        <button className='cursor-pointer px-4 border-black border-2 py-1 text-white rounded-lg bg-sky-600 text-sm' onClick={() => handleClick(3)}>Edit Profile</button>
                    </div>
                    {!isProfileLoading && !profile ?
                        (
                            <div className="flex justify-center items-center min-h-screen">
                                <ClipLoader size={37} color="black" />
                            </div>
                        ) : (
                            <div>
                                <p>{profile.position}</p>
                                <p>{profile.bio}</p>

                            </div>
                        )
                    }
                    <div className='divider'></div>
                    <h1 className='hover:text-blue-500 hover:underline cursor-pointer'>Cards</h1>
                    <h1 className='hover:text-blue-500 hover:underline cursor-pointer'>Theme</h1>
                    <div className='divider'></div>
                    {!isPending && user &&
                        <div className='max-w-2xl w-full'>
                            <button type='button' className='rounded-md cursor-pointer bg-linear-to-br from-green-400 to-green-800 py-3 px-7 text-white' onClick={handleClick1}>Log out</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfileCard
