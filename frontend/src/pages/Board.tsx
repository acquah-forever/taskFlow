import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'

import NavBar from "../components/NavBar"

interface FormValues {
    title: string,
    description: string
}

const Board = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const [open, setOpen] = useState<number | null>(null)

    function handleOpen(index: number) {
        setOpen(prev => prev === index ? null : index)
    }

    function onSubmit() {

    }


    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="mt-7">
                <button className="btn btn-md" onClick={() => handleOpen(1)}>Create Board</button>
            </div>
            {
                open &&
                <div className="mt-2 card bg-base-100 w-60 sm:w-80 h-75 shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div className='flex justify-end'>
                                <X className='cursor-pointer' size={23} onClick={() => handleOpen(2)}/>
                            </div>
                            <h2 className="card-title text-sm font-normal mb-1">Board Title</h2>
                            <input type="text" placeholder="Type here" className="input mb-1 outline-0"
                                {...register('title', { required: "Board title is required" })} />
                            {errors.title && <p className='text-xs text-red-500 mb-2'>{errors.title.message}</p>}

                            <h2 className="card-title text-sm font-normal mb-1">Board Description</h2>
                            <input type="text" placeholder="Type here" className="input mb-1 outline-0"
                                {...register('description', { required: "Description is required" })} />
                            {errors.description && <p className='text-xs text-red-500'>{errors.description.message}</p>}

                            <div className="card-actions mt-5">
                                <button type='submit' className="btn btn-primary">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            }

        </div>

    )
}

export default Board
