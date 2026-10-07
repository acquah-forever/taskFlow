import { useState } from 'react'
import Card from '../components/Card'
import NavBar from "../components/NavBar"

const Board = () => {
    const [card, setCard] = useState([])

    function handleClick() {
        setCard(prevCards => [...prevCards, {}])
    }

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="mt-7">
                <button className="btn btn-xs sm:btn-sm md:btn-md" onClick={handleClick}>Create Board</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mt-4 px-4 sm:px-6 lg:px-8">
                {card.map((_, index) => (
                    <Card key={index} />
                ))}
            </div>
        </div>

    )
}

export default Board
