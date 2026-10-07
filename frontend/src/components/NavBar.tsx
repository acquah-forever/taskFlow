
const NavBar = () => {
    return (
        <div className="flex justify-between items-center p-3 bg-pink-900 text-white">
            <button className="btn btn-xs sm:btn-sm md:btn-md">Create Board</button>
            <h1 className="text-sm sm:text-md md:text-xl font-bold">TaskFlow</h1>
            <div className="flex items-center space-x-4">
                <h1 className="text-xs sm:text-sm md:text-md">User</h1>
                <button className="btn btn-xs sm:btn-sm md:btn-md">Logout</button>
            </div>
        </div>
    )
}

export default NavBar
