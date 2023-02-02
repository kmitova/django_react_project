import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";
import ReviewSection from "./reviews/ReviewSection";
import AuthContext from "../context/AuthContext";


const BookDetails = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext);
    console.log(user)
    const [book, setBook] = useState([]);
    const [bookIsRead, setBooksIsRead] = useState(false)

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

    return (
        <div>
            <h1>Book details page</h1>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
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