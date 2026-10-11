import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useToggle } from "../hooks/open";
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const { data: user, isLoading } = useAuthenticatedUser()
    const { mutate: logOut } = useLogout();
    const { handleClick } = useToggle();
    const navigate = useNavigate();


    function handleClick1() {
        logOut(undefined, {
            onSuccess: () => {
                navigate('/login')
            }
        })
    }

    return (
        <div className='absolute top-15 right-127 flex justify-end'>
            <div className="card bg-base-100 w-80">
                <div className="card-body">
                    <h1 className='uppercase text-xs text-slate-500 font-semibold'>Account</h1>
                    <div className='flex space-x-2'>
                        <div className='flex items-center justify-center border border-white w-12 h-12 rounded-full bg-slate-700' >
                            <h1 className='cursor-pointer text-white'>{user.username.slice(0, 2)}</h1>
                        </div>
                        <div>
                            <h1 className='text-sm'>{user.username}</h1>
                            <h1 className='text-sm'>{user.email}</h1>
                        </div>
                    </div>
                    <h1 className='font-semibold text-sm mt-4'>TaskFlow</h1>
                    <div className='divider'></div>
                    <span className='cursor-pointer' onClick={() => handleClick(3)}>Profile and Visibility</span>
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
