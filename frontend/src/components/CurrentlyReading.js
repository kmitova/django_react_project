import React from "react";


const CurrentlyReading = (props) => {
    const {
        handleCurrentlyReading,
        changeCurrentlyReadingStatus,
        currentlyReading,
        setChangeCurrentlyReading
    } = props;


    return (
        <form action="" onSubmit={handleCurrentlyReading}>
            <button onClick={changeCurrentlyReadingStatus}>
                {/*{currentlyReading*/}
                {/*    ?*/}
                {/*    "Remove from currently reading"*/}
                {/*    :*/}
                {/*    "Start reading"}*/}
                start reading
            </button>
        </form>
    )
}

export default CurrentlyReading;