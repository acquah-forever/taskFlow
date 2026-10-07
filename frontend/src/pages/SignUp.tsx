import Login from "./Login"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'


const SignUp = () => {
    const [useLogin, setUseLogin] = useState(null)
    const navigate = useNavigate()

    function handleClick() {
        setUseLogin(navigate('/login'))
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <fieldset className="fieldset max-w-md w-full border-base-300 rounded-box border p-6">
                <legend className="fieldset-legend text-2xl sm:text-3xl text-transparent bg-clip-text bg-linear-to-br from-sky-500 to-amber-100">TaskFlow Signup</legend>
                <label className="label text-md sm:text-lg text-white">Username</label>
                <input type="text" className="input h-12 mb-2 outline-none w-full" />

                <label className="label text-white text-md sm:text-lg">Email</label>
                <input type="text" className="input h-12 mb-3 outline-none w-full" />

                <label className="label text-white text-md sm:text-lg">Password</label>
                <input type="text" className="input h-12 mb-7 outline-none w-full" />

                <button className="btn bg-[#0967C2] text-white text-md sm:text-lg border-[#0059b3] mb-7">
                    Create Account
                </button>
                <p className="text-center text-white text-md sm:text-lg">Already have an Account? <span className="underline text-transparent bg-clip-text bg-linear-to-br from-sky-500 to-amber-100 cursor-pointer" onClick={handleClick}>Log In</span></p>
            </fieldset>

            {useLogin && <Login />}
        </div>
    )
}

export default SignUp
