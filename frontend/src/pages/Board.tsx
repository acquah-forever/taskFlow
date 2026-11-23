import { useGetTitle, useCreateTitle, useUpdateTitle, useDeleteTitle } from '../hooks/title';
import { useAuthenticatedUser } from '../hooks/users';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToggle } from '../hooks/open';
import { X, Pencil } from 'lucide-react';
import { useOnClickOutside } from 'usehooks-ts';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom'
import NavBar from "../components/NavBar"
import { motion } from "motion/react";


interface FormValues {
    title: string,
    description: string
}

const parent = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.1 } }
};

const children = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, } }
};

const Board = () => {
    const { data: user } = useAuthenticatedUser();
    const { data: cardDetails, isLoading } = useGetTitle();
    const { mutate: createTitle, isPending: isCreating } = useCreateTitle();
    const { mutate: updateTitle, isPending: isUpdating } = useUpdateTitle();
    const { mutate: deleteTitle, isPending: isDeleting } = useDeleteTitle();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>()
    const { open, handleClick } = useToggle();
    const [openEdit, setOpenEdit] = useState<string | null>(null)

    const cardRef = useRef<HTMLDivElement>(null)
    useOnClickOutside(cardRef, () => setOpenEdit(null));
    const boardRef = useRef<HTMLFormElement>(null)
    useOnClickOutside(boardRef, () => handleClick(null));
    const isPending = isCreating || isUpdating || isDeleting

    function onSubmit(data: FormValues) {
        createTitle(data, {
            onSuccess: () => {
                reset();
                handleClick(2)
            }
        })
    }


    function handlePencil(titleId: string) {
        setOpenEdit(prev => prev === titleId ? null : titleId)
    }

    function handleUpdate(data: FormValues, titleId: string) {
        updateTitle({ id: titleId, data }, {
            onSuccess: () => {
                reset();
                setOpenEdit(null);
            }
        })
    }

    function handleDelete(titleId: string) {
        deleteTitle(titleId, {
            onSuccess: () => {
                setOpenEdit(null);
            }
        })
    }



    return (
        <div id='/board' className="flex flex-col">
            <NavBar />
            {
                user ? (
                    <motion.div variants={parent} initial="hidden" animate="visible" className="mt-7">
                        <button className="btn btn-md" onClick={() => handleClick(1)}>Create Task</button>
                    </motion.div>
                ) : (<p className='text-white'>Login to access TaskFlow</p>)
            }
            {
                open === 1 &&
                <motion.div variants={parent} initial="hidden" animate="visible" className="mt-2 card bg-base-100 w-50 sm:w-60 h-75 shadow-sm">
                    <div className="card-body">
                        <motion.form ref={boardRef} variants={children} onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex justify-end'>
                                <X className='cursor-pointer' size={23} onClick={() => handleClick(2)} />
                            </div>
                            <motion.h2 variants={parent} initial="hidden" animate="visible" className="card-title text-sm font-normal mb-1">Board Title</motion.h2>
                            <motion.input variants={parent} initial="hidden" animate="visible" type="text" placeholder="Type here" className="input mb-1 outline-0"
                                {...register('title', { required: "Title is required" })} />
                            {errors.title && <p className='text-xs text-red-500 mb-2'>{errors.title.message}</p>}

                            <motion.h2 variants={parent} initial="hidden" animate="visible" className="card-title text-sm font-normal mb-1">Board Description</motion.h2>
                            <motion.input variants={parent} initial="hidden" animate="visible" type="text" placeholder="Type here" className="input mb-1 outline-0"
                                {...register('description', { required: "Description is required" })} />
                            {errors.description && <p className='text-xs text-red-500'>{errors.description.message}</p>}
                            <div className="card-actions mt-5">
                                <button disabled={isPending} type='submit' className="cursor-pointer bg-sky-500 py-2 px-4 rounded text-white">{isPending ? 'Creating' : 'Create'}</button>
                            </div>
                        </motion.form>
                    </div>
                </motion.div>
            }

            <div className="mt-5">
                <div className="mt-5 px-4">
                    {isLoading ? (
                        <p className='text-white'>Loading boards...</p>
                    ) : cardDetails?.length === 0 ? (
                        <p className='text-white'>No Tasks created yet.</p>
                    ) : (
                        <motion.div variants={parent} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 items-start">
                            {cardDetails?.map((item) => (
                                <NavLink key={item._id} to={`/title/${title._id}/card/${item._id}`}>
                                    <motion.div variants={children} layout className="card bg-base-100 w-full min-h-35 h-auto cursor-pointer hover:bg-sky-700 hover:text-white transition-colors duration-400">
                                        <div className='flex justify-end p-2'>
                                            <X className='cursor-pointer' size={20} onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleDelete(item._id);
                                            }} />
                                        </div>
                                        <div className='px-2'>
                                            <h1 className="font-semibold text-md mb-1 text-justify">{item.title}</h1>
                                            <p className='text-sm text-justify'>{item.description}</p>
                                            <div className='mt-3 mb-3 flex justify-end'>
                                                <Pencil className='cursor-pointer' size={20} onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handlePencil(item._id);
                                                }} />
                                            </div>
                                            {
                                                openEdit === item._id &&
                                                <div ref={cardRef} className='p-2 rounded-md mt-2'>
                                                    <div className='mb-2'>
                                                        <label className='text-sm' htmlFor="editTitle">Edit Title</label>
                                                        <input id="editTitle" className='border rounded-md px-1 outline-none w-full text-justify leading-6' type="text" {...register('title', { required: "Title is required" })} />
                                                        {errors.title && (<p className='text-red-500 text-xs'>{errors.title.message}</p>)}
                                                    </div>
                                                    <div>
                                                        <label className='text-sm' htmlFor="editDescription">Edit Description</label>
                                                        <input id="editDescription" className='border rounded-md px-1 outline-none w-full text-justify leading-6' type="text" {...register('description', { required: "Description is required" })} />
                                                        {errors.description && (<p className='text-red-500 text-xs'>{errors.description.message}</p>)}
                                                    </div>
                                                    <button className='cursor-pointer bg-amber-500 py-2 px-4 rounded text-slate- mt-3' type='button' disabled={isUpdating} onClick={handleSubmit((data) => handleUpdate(data, item._id))}>
                                                        {isUpdating ? 'Updating...' : 'Update'}
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </motion.div>
                                </NavLink>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Board
