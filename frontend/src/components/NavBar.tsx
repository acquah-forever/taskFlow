import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NavBar = () => {
    const [open, setOpen] = useState(false)

    function handleClick() {
        setOpen(prev => !prev)
    }

    return (
        <div>
            <div className="bg-pink-900 text-white flex justify-between items-center px-10 py-3">
                <h1>myBoards</h1>
                <h1 className="text-sm sm:text-md md:text-xl font-bold">TaskFlow</h1>
                <div className="flex items-center space-x-4">
                    <h1 className="text-xs sm:text-sm md:text-md hidden sm:flex">User</h1>
                    <button className="btn btn-active btn-accent hidden sm:flex">Logout</button>
                    <button className='flex sm:hidden' type='button' aria-label='open-close buttons' onClick={handleClick}>
                        {open ? <X className='cursor-pointer' size={22} /> : <Menu className='cursor-pointer' size={22} />}
                    </button>
                </div>
            </div>
            {open &&
                <div className='mt-4 space-y-2 border sm:border-0 border-white px-3 py-2'>
                    <h1 className="text-sm md:text-md flex sm:hidden text-white">User</h1>
                    <button className="btn btn-active btn-accent btn-sm flex sm:hidden">Logout</button>
                </div>
            }
        </div>
    )
}

export default NavBar
