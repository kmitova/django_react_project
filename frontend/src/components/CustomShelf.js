import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";


const CustomShelf = () => {

    const {id} = useParams()
    console.log(id)
    const [shelf, setShelf] = useState('');
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fetchShelf = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_custom_shelf/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            console.log(result)
            if (result.status === 200) {
                console.log(result.data)
                setShelf(result.data)
            }
        };
        fetchShelf()
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        const fetchShelfBooks = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/show_books_on_custom_shelf/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            console.log(result)
            if (result.status === 200) {
                console.log(result.data)
                setBooks(result.data)
            }
        };
        fetchShelfBooks()
            .catch(console.error);
    }, [id]);



    return (
        <div>
            <h1>Custom shelf</h1>
            <h1>{shelf.name}</h1>
            {
                books.length === 0 ? <h2>No books on this shelf yet.</h2>
                    :

                    <ul>
                        {
                            books.map((book) => <li key={book.id}>{book.book.title} by {book.book.author} <Link
                                to={`/book/${book.book.id}`}>
                                to book details
                            </Link></li>)
                        }
                    </ul>
            }


        </div>
    )
}

export default CustomShelf;