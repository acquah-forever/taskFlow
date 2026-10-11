// import { useState } from 'react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLogout, useAuthenticatedUser } from '../hooks/users';
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    const { data: user, isLoading } = useAuthenticatedUser()
    const { mutate: logOut } = useLogout();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    function handleClick() {
        setOpen(prev => !prev)
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
                    {!isLoading && user ? (
                        <div>
                            <button className="btn btn-active btn-accent hidden sm:flex" onClick={handleClick1}>Logout</button>
                        </div>

                    ) : (
                        <button className="btn btn-active btn-accent hidden sm:flex">Login</button>

                    )}
                    <button className='flex sm:hidden' type='button' aria-label='open-close buttons' onClick={handleClick}>
                        {open ? <X className='cursor-pointer' size={22} /> : <Menu className='cursor-pointer' size={22} />}
                    </button>
                </div>
            </div>
            {open && (
                <div className='bg-pink-900 text-white flex sm:hidden space-y-4 px-2 py-4 border border-t-0 border-l-0 border-r-0 border-white'>
                    {!isLoading && user ? (
                        <div>
                            <button className="btn btn-active btn-accent" onClick={handleClick1}>Logout</button>
                        </div>

                    ) : (
                        <button className="btn btn-active btn-accent">Login</button>

                    )}
                </div>
            )}
        </div>
    )
}

export default NavBar
