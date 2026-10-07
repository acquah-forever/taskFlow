
const NavBar = () => {


    return (
        <div>
            <div className="bg-pink-900 text-white flex justify-between items-center px-10 py-3">
                <h1>myBoards</h1>
                <h1 className="text-sm sm:text-md md:text-xl font-bold">TaskFlow</h1>
                <div className="flex items-center space-x-4">
                    <h1 className="text-xs sm:text-sm md:text-md">User</h1>
                    <button className="btn btn-active btn-accent">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default NavBar
