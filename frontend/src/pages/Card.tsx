import { useParams } from "react-router-dom";

const CardDetails = () => {

    const { titleId, cardId } = useParams();

    console.log(titleId);
    console.log(cardId);

    return (
        <div>
            <h1>Individual Card Details</h1>
        </div>
    );
};

export default CardDetails;