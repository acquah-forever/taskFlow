import { useToggle } from "../hooks/open";
import { X } from 'lucide-react';

const EditProfile = () => {
    const { handleClick } = useToggle();

    return (
        <div>
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

    )
}

export default EditProfile
