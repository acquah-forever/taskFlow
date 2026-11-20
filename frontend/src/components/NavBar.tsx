import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useGetProfile } from '../hooks/profile';
import { Menu, X } from 'lucide-react';
import { useToggle } from "../hooks/open";
import { useNavigate } from 'react-router-dom';
import ProfileCard from './ProfileCard';
import EditProfile from './EditProfile';
import { motion, AnimatePresence } from "motion/react";
import { useOnClickOutside } from "usehooks-ts";
import { useRef } from 'react';


const NavBar = () => {
    const { data: user, isLoading } = useAuthenticatedUser()
    const { data: profile } = useGetProfile();
    const { mutate: logOut } = useLogout();
    const { open, handleClick } = useToggle();
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(cardRef, () => handleClick(null));

    function handleLogout() {
        logOut(undefined, {
            onSuccess: () => {
                navigate('/login')
            }
        })
    }

    const parent = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.1 } }
    };

    const children = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, } }
    };

    return (
        <div className="relative">
            <div className="bg-pink-900 text-white flex justify-between items-center px-1 py-3">
                <h1>myBoards</h1>
                <h1 className="text-sm sm:text-md md:text-xl font-bold">TaskFlow</h1>
                <div className="flex items-center space-x-4">
                    {!isLoading && user && <h1 className="hidden sm:flex">Welcome</h1>}
                    {user ? (
                        <div className='relative'>
                            <button type='button' aria-label='Open account menu' className=' items-center justify-center border border-white w-8 h-8 rounded-full bg-slate-700 hidden sm:flex' onClick={() => handleClick(2)}>
                                <span className='cursor-pointer'>{user.username.slice(0, 2)}</span>
                            </button>
                            {open === 2 && <ProfileCard handleClick={handleClick} />}
                        </div>
                    ) : (
                        <button type='button' className='btn btn-active btn-accent' onClick={() => navigate('/login')}>Login</button>
                    )}
                    <button className='flex sm:hidden' type='button' aria-label='open-close buttons' onClick={() => handleClick(1)}>
                        {open === 1 ? <X className='cursor-pointer' size={22} /> : <Menu className='cursor-pointer' size={22} />}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {open === 1 && (
                    <motion.div ref={cardRef} variants={parent} initial="hidden" animate="visible" exit={{ opacity: 0, y: 50 }}  className=' absolute top-full left-0 z-50 w-full bg-pink-900 text-white flex sm:hidden space-y-4 px-2 py-4 border border-t-0 border-l-0 border-r-0 border-white'>
                        {!isLoading && user ? (
                            <motion.div variants={children} className='w-full px-3 flex flex-col space-y-4'>
                                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-3'>
                                    <button type='button' aria-label='Open account menu' className='flex items-center justify-center border border-white w-10 h-10 rounded-full bg-slate-700 shrink-0'>
                                        <span>{user.username.slice(0, 2)}</span>
                                    </button>
                                    <div className='flex flex-col min-w-0 w-full'>
                                        <p className='font-semibold text-sm sm:text-base break-word'>{profile.position}</p>
                                        <p className='text-sm text-white/80 break-word'>{profile.bio}</p>
                                    </div>
                                </div>
                                <div className='flex justify-end'>
                                    <button type='button' className="btn btn-active btn-accent sm:hidden" onClick={handleLogout}>Logout</button>
                                </div>
                            </motion.div>
                        ) : (
                            <button className="btn btn-active btn-accent" onClick={() => navigate('/login')}>Login</button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {open === 3 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 sm:p-6">
                    <div className="w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-4 text-black shadow-xl sm:p-8">
                        <EditProfile handleClick={handleClick} />
                    </div>
                </div>
            )}

        </div>
    )
}

export default NavBar
