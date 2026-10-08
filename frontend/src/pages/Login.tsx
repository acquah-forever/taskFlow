import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CircleAlert } from 'lucide-react'

interface FormValue {
    name: string,
    password: string
}
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValue>()
    const navigate = useNavigate()
    const boardNavigate = useNavigate()

    function onSubmit(data: FormValue) {
        console.log(data)
        boardNavigate('/board')
    }

    return (
        <form id='login' onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center min-h-screen">
            <fieldset  className="fieldset max-w-md w-full border-base-300 rounded-box border p-6">
                <legend className="fieldset-legend text-2xl sm:text-3xl text-transparent bg-clip-text bg-linear-to-br from-sky-500 to-amber-100">TaskFlow Login</legend>
                <label className="label text-md sm:text-lg text-white">Username</label>
                <input type="text" className="input h-12  outline-none w-full" {...register("name", { required: "Username is required" })} />
                {errors.name &&
                    <div className='flex items-center space-x-1'>
                        <CircleAlert className='text-pink-300' size={20} />
                        <p className='text-pink-300'>{errors.name.message}</p>
                    </div>
                }

                <label className="label text-white text-md sm:text-lg mt-3">Password</label>
                <input type="password" className="input h-12 outline-none w-full"{...register("password", { required: "A password is required" })} />
                {errors.password &&
                    <div className='flex items-center space-x-1'>
                        <CircleAlert className='text-pink-300' size={20} />
                        <p className='text-pink-300'>{errors.password.message}</p>
                    </div>
                }

                <button type='submit' className="btn bg-[#0967C2] text-white text-md sm:text-lg border-[#0059b3] mb-7 mt-5">
                    Sign In
                </button>
                <p className="text-center text-white text-md sm:text-lg">Dont have an Account? <button type="button" className="underline text-transparent bg-clip-text bg-linear-to-br from-sky-500 to-amber-100 cursor-pointer" onClick={() => navigate('/signup')}>
                    Sign Up
                </button></p>
            </fieldset>
        </form>
    )
}

export default Login
