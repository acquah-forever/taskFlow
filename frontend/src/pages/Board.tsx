import { useGetTitle, useCreateTitle } from '../hooks/title';
import { useForm } from 'react-hook-form';
import { useToggle } from '../hooks/open';
import { X,Pencil } from 'lucide-react';

import NavBar from "../components/NavBar"

interface FormValues {
    title: string,
    description: string
}

const Board = () => {
    const { data: cardDetails, isLoading } = useGetTitle();
    const { mutate: createTitle, isPending: isCreating } = useCreateTitle();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
    const { open, handleClick } = useToggle();
    const {edit, setEdit } = useState<number | null>(null)
    const isPending = isCreating


    function onSubmit(data: FormValues) {
        createTitle(data, {
            onSuccess: () => {
                reset();
                handleClick(2)
            }
        })

    }


    return (
        <div id='/board' className="flex flex-col">
            <NavBar />
            <div className="mt-7">
                <button className="btn btn-md" onClick={() => handleClick(1)}>Create Task</button>
            </div>
            {
                open === 1 &&
                <div className="mt-2 card bg-base-100 w-60 sm:w-80 h-75 shadow-sm">
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex justify-end'>
                                <X className='cursor-pointer' size={23} onClick={() => handleClick(2)} />
                            </div>
                            <h2 className="card-title text-sm font-normal mb-1">Board Title</h2>
                            <input type="text" placeholder="Type here" className="input mb-1 outline-0"
                                {...register('title', { required: "Title is required" })} />
                            {errors.title && <p className='text-xs text-red-500 mb-2'>{errors.title.message}</p>}


                            <h2 className="card-title text-sm font-normal mb-1">Board Description</h2>
                            <input type="text" placeholder="Type here" className="input mb-1 outline-0"
                                {...register('description', { required: "Description is required" })} />
                            {errors.description && <p className='text-xs text-red-500'>{errors.description.message}</p>}


                            <div className="card-actions mt-5">
                                <button disabled={isPending} type='submit' className="btn btn-primary">{isPending ? 'Creating' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            }

            <div className="mt-5">

                {isLoading ? (<p className='text-white'>Loading boards...</p>) : 
                cardDetails?.length === 0 ? (<p className='text-white'>No Tasks created yet.</p>) : 
                
                (
                    cardDetails?.map((item) => (
                        <div key={item._id} className="card bg-base-100 w-50 sm:w-60 h-40 mb-3 flex cursor-pointer">
                            <div className='flex justify-end p-2'><X className='cursor-pointer' size={20} /></div>
                            <div className='px-2'>
                                <h1 className="font-semibold text-md mb-1">{item.title}</h1>
                                <p className='text-sm'>{item.description}</p>
                                <div className='mt-3'><Pencil className='cursor-pointer' size={20} /></div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </div>

    )
}

export default Board
