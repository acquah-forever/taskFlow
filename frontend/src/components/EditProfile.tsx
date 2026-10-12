import { X } from 'lucide-react';

type EditProfileProps = {
    handleClick: (index: number) => void;
};

const EditProfile = ({ handleClick }: EditProfileProps) => {

    return (
        <div className='w-full'>
            <div className='mb-6 flex w-full items-start justify-between gap-4 sm:mb-7'>
                <h1 className='text-lg font-semibold sm:text-xl'>Profile and Visibility</h1>
                <button type='button' aria-label='Close profile editor' className='shrink-0 cursor-pointer' onClick={() => handleClick(3)}><X className='cursor-pointer' size={28} /></button>
            </div>
            <div className='mb-8 flex w-full items-center justify-center sm:mb-12'>
                <img className='h-auto w-32 max-w-full sm:w-44' src="https://trello.com/assets/580c9958c13d47ad0daa.svg" alt="profile" />
            </div>
            <h2 className='mb-5 text-lg font-semibold sm:mb-7 sm:text-xl'>Manage your personal information</h2>
            <div className='mb-5 space-y-3 break-words border bg-slate-300 p-3 text-sm text-slate-800 sm:p-4'>
                <p>This is an TaskFlow account. Edit your personal information and visibility settings through your TaskFlow profile.</p>
                <p>To learn more, view our <span className='text-sky-600 underline'>Terms of Service</span> or <span className='text-sky-600 underline'>Privacy Policy</span>.</p>

            </div>
            <h2 className='font-semibold mb-3'>About</h2>
            <p className='mb-6 text-sm sm:mb-7'>Required fields are marked with asterik <span className='text-red-500'>*</span> </p>
            <form className='w-full' action="">
                <div className='flex flex-col space-y-2 mb-5'>
                    <label className='font-semibold' htmlFor="username">Username</label>
                    <input id='username' className='w-full min-w-0 rounded-md border bg-white p-2 outline-none' type="text" />
                </div>
                <div className='flex flex-col space-y-2'>
                    <label className='font-semibold' htmlFor="bio">Bio</label>
                    <input id='bio' className='w-full min-w-0 rounded-md border bg-white p-2 outline-none' type="text" />
                </div>
                <div className='flex justify-end mt-7'>
                    <button type='button' className="btn btn-info">Save</button>
                </div>

            </form>
        </div>

    )
}

export default EditProfile
