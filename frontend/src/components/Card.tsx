
const Card = () => {
    return (

        <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-sm mt-4">
            <figure className="aspect-video overflow-hidden">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" className="w-full h-full object-cover"/>
            </figure>

            <div className="card-body p-4 sm:p-5">
                <h2 className="card-title text-base sm:text-lg">
                    Card Title
                </h2>
                <p className="text-sm sm:text-base">
                    A card component has a figure, a body part, and inside body
                    there are title and actions parts.
                </p>

                <div className="card-actions justify-end mt-2">
                    <button className="btn btn-primary btn-sm sm:btn-md">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card
