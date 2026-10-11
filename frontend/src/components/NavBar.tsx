// import { useState } from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const { data: user, isLoading } = useAuthenticatedUser()
    const { mutate: logOut } = useLogout();
    const [open, setOpen] = useState<number | null>(null);
    const navigate = useNavigate();

    function handleClick(index: number) {
        setOpen((prev) => prev == index ? null : index)
    }

    function handleClick1() {
        logOut(undefined, {
            onSuccess: () => {
                navigate('/login')
            }
        })
    }

    return (
        <div>
            <div className="bg-pink-900 text-white flex justify-between items-center px-10 py-3">
                <h1>myBoards</h1>
                <h1 className="text-sm sm:text-md md:text-xl font-bold">TaskFlow</h1>
                <div className="flex items-center space-x-4">
                    {!isLoading && user && <h1 className="hidden sm:flex">Welcome</h1>}
                    <div className='flex items-center justify-center border border-white w-8 h-8 rounded-full bg-slate-700' onClick={() => handleClick(2)}>
                        <h1 className='cursor-pointer'>{user.username.slice(0, 2)}</h1>
                    </div>
                    <button className='flex sm:hidden' type='button' aria-label='open-close buttons' onClick={() => handleClick(1)}>
                        {open ? <X className='cursor-pointer' size={22} /> : <Menu className='cursor-pointer' size={22} />}
                    </button>
                </div>
            </div>
            {open === 1 && (
                <div className='bg-pink-900 text-white flex sm:hidden space-y-4 px-2 py-4 border border-t-0 border-l-0 border-r-0 border-white'>
                    {!isLoading && user ? (
                        <div className='w-full px-3 flex flex-col space-y-3'>
                            <h1 className='flex sm:hidden'>Welcome &nbsp;{<span className='font-bold font text-transparent bg-clip-text bg-linear-to-br from-sky-400 to-purple-200'>{user.username}</span>}</h1>
                            <div className='flex justify-end'>
                                <button className="btn btn-active btn-accent sm:hidden" onClick={handleClick1}>Logout</button>
                            </div>
                        </div>

                    ) : (
                        <button className="btn btn-active btn-accent">Login</button>

                    )}
                </div>
            )}

            {open === 2 && (
                <div className='absolute top-15 right-10 flex justify-end'>
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
                            <h1 className='font-semibold text-sm'>taskFlow</h1>
                            <div className='divider'></div>
                            <h1>Profile and Visibility</h1>
                            <h1>Cards</h1>
                            <div className='divider'></div>
                            {!isLoading && user &&
                                <div className='max-w-2xl w-full'>
                                    <button className='cursor-pointer bg-linear-to-br from-emerald-400 to-emerald-700 py-3'onClick={handleClick1}>Log out</button>
                                </div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar
