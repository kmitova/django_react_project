import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL as url, URL} from "../utils/url";
import ReviewSection from "./reviews/ReviewSection";
import AuthContext from "../context/AuthContext";


const BookDetails = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext);
    console.log(user)
    const [book, setBook] = useState({});
    const [bookIsRead, setBooksIsRead] = useState(false)
    const [wantToRead, setWantToRead] = useState(false)
    const [wantToReadObject, setWantToReadObject] = useState(null)
    const [changeWantToRead, setChangeWantToRead] = useState(false)



    useEffect(() => {
        const fetchBook = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/book/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                console.log(result.data)
                setBook(result.data)
            }
        };
        fetchBook()
            .catch(console.error);
    }, [id]);

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
                let relevantData = result.data[result.data.length-1]
                console.log(relevantData)
                setBooksIsRead(relevantData.is_read)
                // setBooksIsRead(result.data)
                // setBookIsRead(result.data)
            }
        };
        fetchBookStatus()
            .catch(console.error);
    }, [id]);

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
                console.log(result.data)
                for (let item of result.data) {
                    console.log(item)
                    console.log(book)
                    console.log(item.book, book.id)
                    if (item.book === book.id) {
                        setWantToRead(item.want_to_read)
                        setWantToReadObject(item)
                        console.log(item)

                        break
                    }
                }
                console.log(wantToReadObject)
            }
        };
        fetchWantToReadStatus()
            .catch(console.error);
    },  [id]);


    const changeStatus = async (e, book) => {
        e.preventDefault();
        setBooksIsRead(e.target.checked)
        let token = getAccessToken()
        let data = {
            book: book.id,
            user: user.user_id,
            is_read: bookIsRead
        }
        console.log(data)
        await axios.post(`${URL}api_books/change_book_status/${book.id}/`,
            data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

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
            await axios.put(`${url}api_books/edit_want_to_read/${wantToReadObject.id}/`,
            data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((result) => {
                console.log('success, put request')
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
                    console.log('success, post request')
                    console.log(result.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div>
            <h1>Book details page</h1>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
            <form action="" onSubmit={handleWantToRead}>
                <button onClick={() => {
                    setChangeWantToRead(!changeWantToRead)
                    console.log(changeWantToRead)
                }
                }>{wantToRead ? "Remove from want to read" : "Add to want to read"}</button>
                {/*{wantToRead ? <button>Remove from want to read</button> : <button>Add to want to read</button>}*/}
            </form>
            <form action="">
                <label htmlFor="">Book is read</label>
                {bookIsRead ?
                    <input type="checkbox" name="is_read" checked
                           onChange={(e) => changeStatus(e, book)}/> :
                    <input type="checkbox" name="is_read" onChange={(e) => changeStatus(e, book)}/>}
            {/*  add submit button  */}
            </form>
            <ReviewSection book={book}/>
        </div>

    )
}

export default BookDetails;