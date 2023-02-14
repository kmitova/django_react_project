import CurrentlyReading from "./CurrentlyReading";
import WantToRead from "./WantToRead";
import ChangeReadStatus from "./ChangeReadStatus";
import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL as url, URL} from "../utils/url";

const BookStatus = (props) => {
    const {book, user, id} = props;
    console.log(book)
    console.log(user)

    //////

    const [wantToRead, setWantToRead] = useState(false)
    const [wantToReadObject, setWantToReadObject] = useState(null)
    const [changeWantToRead, setChangeWantToRead] = useState(false)

        useEffect(() => {
        const fetchWantToReadStatus = async () => {

            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_want_to_read/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                for (let item of result.data) {
                    if (item.book.id === book.id && item.user === user.user_id) {
                        setWantToRead(item.want_to_read)
                        setWantToReadObject(prevState => item)
                        console.log(item)
                        break
                    }
                }
            }
        };
        fetchWantToReadStatus()
            .catch(console.error);
    }, [book]);


    const handleWantToRead = async (e) => {
        e.preventDefault()
        console.log(book)
        let token = getAccessToken();
        let data = {
            user: user.user_id,
            book: book.id,
            want_to_read: changeWantToRead
        }
        console.log(data)
        console.log(wantToReadObject)
        if (wantToReadObject !== null) {
            await axios.delete(`${url}api_books/edit_want_to_read/${wantToReadObject.id}/`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }, data
                })
                .then((result) => {
                    setWantToRead(false)
                    console.log('success, delete request')
                    console.log(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            await axios.post(`${url}api_books/want_to_read/`,
                data, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((result) => {
                    setWantToRead(true)
                    console.log('success, post request')
                    console.log(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const changeWantToReadStatus = () => setChangeWantToRead(!changeWantToRead)

    //////

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
                    if (item.book.id === book.id && item.user === user.user_id) {
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
                    // setWantToReadObject(prev => null)
                    console.log('success, post request')
                    console.log(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const changeCurrentlyReadingStatus = () => setChangeCurrentlyReading(!changeCurrentlyReading)
    /////


    const bookId = book.id

    const [bookIsRead, setBooksIsRead] = useState(false)
    const [isReadObject, setIsReadObject] = useState(null)
    const [changeIsRead, setChangeIsRead] = useState(false)

    useEffect(() => {
        const fetchBookStatus = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_book_status/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                console.log(result.data)
                // if (result.data.length > 0) {
                //
                //     let relevantData = result.data[result.data.length - 1]
                //     if (relevantData.user === user.user_id) {
                //         console.log(relevantData)
                //     setBooksIsRead(prevState => relevantData.is_read)
                //     setIsReadObject(prevState => relevantData)
                //     }
                //
                //
                // }
                for (let item of result.data) {
                    console.log(item)
                    console.log(item.user)
                    console.log(book)
                    console.log(item.book.id, book.id, item.user, user.user_id)
                    console.log(item.book.id === book.id && item.user === user.user_id)
                    if (item.book.id === book.id && item.user === user.user_id) {
                        setBooksIsRead(item.is_read)
                        setIsReadObject(prevState => item)
                        console.log(item)
                        break
                    }
                }
            }
        };
        fetchBookStatus()
            .catch(console.error);
    }, [id, book]);

    const changeStatus = async (e, book) => {
        e.preventDefault();
        // setBooksIsRead(e.target.checked)
        let token = getAccessToken()
        let data = {
            book: bookId,
            user: user.user_id,
            is_read: bookIsRead
        }
        console.log(data)
        console.log(isReadObject)
        if (isReadObject !== null) {
            await axios.delete(`${URL}api_books/edit_book_status/${isReadObject.id}/`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }, data
            })
            .then((result) => {
                setBooksIsRead(false)
                // setCurrentlyReadingObject(prev => null)
                console.log('success, delete request')
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
           await axios.post(`${URL}api_books/change_book_status/`,
            data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((result) => {
                // setCurrentlyReadingObject(prev => null)
                console.log(result.data);
                setBooksIsRead(true)
                // setIsReadObject(result.data)
            })
            .catch((error) => {
                console.log(error);
            })
        }

    }

    const changeBookIsReadStatus = () => setBooksIsRead(!bookIsRead)

    ///////

    return (
        <div>
            {wantToReadObject === null && isReadObject === null && currentlyReadingObject === null ?
            <WantToRead book={book} user={user}
                    handleWantToRead={handleWantToRead}
                    changeWantToReadStatus={changeWantToReadStatus}
                    wantToRead={wantToRead}
                    setChangeWantToRead={setChangeWantToRead}/>
                : ''}
            {currentlyReadingObject === null && wantToReadObject !== null && isReadObject === null ?
            <CurrentlyReading
                              handleCurrentlyReading={handleCurrentlyReading}
                              changeCurrentlyReadingStatus={changeCurrentlyReadingStatus}
                              currentlyReading={currentlyReading}
                              setChangeCurrentlyReading={setChangeCurrentlyReading}
            /> : '' }
            {isReadObject === null && currentlyReadingObject !== null && wantToReadObject !== null ?
            <ChangeReadStatus book={book} user={user} id={id}
            changeStatus={changeStatus}
            changeBookIsReadStatus={changeBookIsReadStatus}
            bookIsRead={bookIsRead}/>
                : ''}
            {isReadObject !== null && currentlyReadingObject !== null && wantToReadObject !== null
            ?
            <h2>Book is read!</h2>
            : ''}
        </div>

    )
}


export default BookStatus;