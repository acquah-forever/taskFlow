import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react'

type ProfileCardProps = {
    handleClick: (index: number) => void;
};

const ProfileCard = ({ handleClick }: ProfileCardProps) => {
    const { data: user, isLoading } = useAuthenticatedUser()
    const { mutate: logOut } = useLogout();
    const navigate = useNavigate();


    function handleClick1() {
        logOut(undefined, {
            onSuccess: () => {
                navigate('/login')
            }
        })
    }

    if (!user) return null;

    return (
        <div className='absolute top-15 right-127 flex justify-end'>
            <div className="card bg-base-100 w-80">
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
                    <h1 className='font-semibold text-sm mt-4'>TaskFlow</h1>
                    <div className='divider'></div>
                    <button type='button' className='cursor-pointer' onClick={() => handleClick(3)}>Profile and Visibility</button>
                    <h1>Cards</h1>
                    <h1>Theme</h1>
                    <div className='divider'></div>
                    {!isLoading && user &&
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
