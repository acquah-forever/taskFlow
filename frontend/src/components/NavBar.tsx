
import { Menu, X } from 'lucide-react';
import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useNavigate } from 'react-router-dom';
import { useToggle } from "../hooks/open";

const NavBar = () => {
    const { data: user, isLoading } = useAuthenticatedUser()
    const { mutate: logOut } = useLogout();
    const navigate = useNavigate();
    const { open, handleClick } = useToggle();


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
            )}

            {open === 3 &&
                <div className="mt-15 mx-auto fixed inset-0 z-50 flex flex-col border w-160 h-200 text-black items-start overflow-y-scroll bg-white/80 p-4 sm:p-8 px-10">
                    <div className='w-full flex justify-between mb-7'>
                        <h1 className='text-lg sm:text-xl font-semibold'>Profile and Visibility</h1>
                        <X className='cursor-pointer' onClick={() => handleClick(null)} size={28} />
                    </div>
                    <div className='flex justify-center items-center w-full mb-12'>
                        <img src="https://trello.com/assets/580c9958c13d47ad0daa.svg" alt="profile" />
                    </div>
                    <h1 className='text-lg sm:text-xl font-semibold mb-7'>Manage your personal information</h1>
                    <div className='border p-2 text-sm text-slate-800 bg-slate-300 space-y-3 mb-5'>
                        <p>This is an TaskFlow account. Edit your personal information and visibility settings through your TaskFlow profile.</p>
                        <p>To learn more, view our <span className='text-sky-600 underline'>Terms of Service</span> or <span className='text-sky-600 underline'>Privacy Policy</span>.</p>

                    </div>
                    <h2 className='font-semibold mb-3'>About</h2>
                    <p className='text-sm mb-7'>Required fields are marked with asterik <span className='text-red-500'>*</span> </p>
                    <form className='w-full' action="">
                        <div className='flex flex-col space-y-2 mb-5'>
                            <label className='font-semibold' htmlFor="username">Username</label>
                            <input className='bg-white p-2 border rounded-md outline-none' type="text" />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <label className='font-semibold' htmlFor="bio">Bio</label>
                            <input className='bg-white p-2 border rounded-md outline-none' type="text" />
                        </div>
                        <div className='flex justify-end mt-7'>
                            <button className="btn btn-info">Save</button>
                        </div>

                    </form>
                </div>
            }
        </div>
    )
}

export default NavBar
