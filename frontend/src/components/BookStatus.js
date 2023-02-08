import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import ChangeReadStatus from "./ChangeReadStatus";
import React from "react";

const BookStatus = (props) => {
    const {book, user, id} = props;

    return (
        <div>
            <CurrentlyReading book={book} user={user}/>
            <WantToRead book={book} user={user}/>
            <ChangeReadStatus book={book} user={user} id={id}/>
        </div>

    )
}

export default BookStatus;