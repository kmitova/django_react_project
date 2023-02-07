import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL as url, URL} from "../utils/url";

const CurrentlyReading = (props) => {
    const {book, user} = props;
    const [currentlyReading, setCurrentlyReading] = useState(false)
    const [currentlyReadingObject, setCurrentlyReadingObject] = useState(null)
    const [changeCurrentlyReading, setChangeCurrentlyReading] = useState(false)

    useEffect(() => {
        const fetchCurrentlyReadingStatus = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_currently_reading/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                for (let item of result.data) {
                    if (item.book.id === book.id) {
                        setCurrentlyReading(item.currently_reading)
                        setCurrentlyReadingObject(prevState => item)
                        console.log(item)
                        break
                    }
                }
            }
        };
        fetchCurrentlyReadingStatus()
            .catch(console.error);
    }, [book]);

    const handleCurrentlyReading = async (e) => {
        e.preventDefault()
        console.log(book)
        let token = getAccessToken();
        let data = {
            user: user.user_id,
            book: book.id,
            currently_reading: changeCurrentlyReading
        }
        console.log(data)
        console.log(currentlyReadingObject)
        if (currentlyReadingObject !== null) {
            await axios.delete(`${url}api_books/edit_currently_reading/${currentlyReadingObject.id}/`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }, data
                })
                .then((result) => {
                    setCurrentlyReading(false)
                    console.log('success, delete request')
                    console.log(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            await axios.post(`${url}api_books/currently_reading/`,
                data, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((result) => {
                    setCurrentlyReading(true)
                    console.log('success, post request')
                    console.log(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <form action="" onSubmit={handleCurrentlyReading}>
            <button onClick={() => setChangeCurrentlyReading(!changeCurrentlyReading)}>
                {currentlyReading
                    ?
                    "Remove from currently reading"
                    :
                    "Start reading"}
            </button>
        </form>
    )
}

export default CurrentlyReading;