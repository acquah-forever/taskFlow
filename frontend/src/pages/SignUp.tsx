import Login from "./Login"
import { useState } from "react"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { CircleAlert } from 'lucide-react'
import { useSignUp } from "../hooks/users"

interface FormValue {
    username: string,
    email: string,
    password: string
}


const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValue>()
    const { mutate: signUp, isPending, error } = useSignUp()
    const [useLogin, setUseLogin] = useState(null)
    const navigate = useNavigate()


    function onSubmit(data: FormValue) {
        signUp(data, {
            onSuccess: () => {
                navigate("/board")
            }
        });

    };

    function handleClick() {
        setUseLogin(navigate('/login'))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center min-h-screen">
            <fieldset className="fieldset max-w-md w-full border-base-300 rounded-box border p-6">
                <legend className="fieldset-legend text-2xl sm:text-3xl text-transparent bg-clip-text bg-linear-to-br from-sky-500 to-amber-100">TaskFlow Signup</legend>
                {error && <div className='flex items-center space-x-1'>
                    <CircleAlert className='text-pink-300' size={20} />
                    <p className='text-pink-300'>{error.message}</p>
                </div>}
                <label className="label text-md sm:text-lg text-white">Username</label>
                <input type="text" className="input h-12 mb-2 outline-none w-full" {...register("username", { required: "Username is required" })} />
                {errors.username &&
                    <div className='flex items-center space-x-1'>
                        <CircleAlert className='text-pink-300' size={20} />
                        <p className='text-pink-300'>{errors.username.message}</p>
                    </div>
                }

                <label className="label text-white text-md sm:text-lg">Email</label>
                <input type="text" className="input h-12 mb-3 outline-none w-full" {...register("email", { required: "Email is required" })} />
                {errors.email &&
                    <div className='flex items-center space-x-1'>
                        <CircleAlert className='text-pink-300' size={20} />
                        <p className='text-pink-300'>{errors.email.message}</p>
                    </div>
                }

                <label className="label text-white text-md sm:text-lg">Password</label>
                <input type="password" className="input h-12 mb-7 outline-none w-full" {...register("password", { required: "Password is required" })} />
                {errors.password &&
                    <div className='flex items-center space-x-1'>
                        <CircleAlert className='text-pink-300' size={20} />
                        <p className='text-pink-300'>{errors.password.message}</p>
                    </div>
                }

                <button className="btn bg-[#0967C2] text-white text-md sm:text-lg border-[#0059b3] mb-7">
                    Create Account
                </button>
                <p className="text-center text-white text-md sm:text-lg">Already have an Account? <button type="button" disabled={isPending} className="underline text-transparent bg-clip-text bg-linear-to-br from-sky-500 to-amber-100 cursor-pointer" onClick={handleClick}>{isPending ? "Creatin Account" : "Sign Up"}</button></p>
            </fieldset>

            {useLogin && <Login />}
        </form>
    )
}

export default SignUp
