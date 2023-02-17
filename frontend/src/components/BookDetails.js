import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";
import ReviewSection from "./reviews/ReviewSection";
import AuthContext from "../context/AuthContext";
import BookStatus from "./BookStatus";
import Shelves from "./Shelves";


const BookDetails = () => {
    const {id} = useParams()
    const {user} = useContext(AuthContext);
    const [book, setBook] = useState({});

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
                setBook(prevState => result.data)
            }
        };
        fetchBook()
            .catch(console.error);
    }, [id]);

    // FETCH SHELVES
    const [shelves, setShelves] = useState([])

        useEffect(() => {
        const fetchShelves = async () => {
            let token = getAccessToken()
            let result = await axios.get(`${URL}api_books/view_shelves/`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer  ${token}`
                    }
                }
                );
            if (result.status === 200) {
                console.log(result.data)
                setShelves(result.data)
            }
        }
        fetchShelves()
            .catch(console.error)
    }, [])

    const [addToCustomShelf, setAddToCustomShelf] = useState(null)
    const [booksCustomShelves, setBooksCustomShelves] = useState([])

    useEffect(() => {
        const fetchBooksOnCustomShelves = async () => {
            let token = getAccessToken()
            let result = await axios.get(`${URL}api_books/view_books_on_custom_shelves/`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer  ${token}`
                    }
                }
                );
            if (result.status === 200) {
                console.log(result.data)
                let res = result.data.map((i) => i.shelf)
                console.log(res)
                setBooksCustomShelves(result.data.map((i) => i.shelf))
            }
        }
        fetchBooksOnCustomShelves()
            .catch(console.error)
    }, [shelves])



    const handleSubmit = async (e, shelf) => {
        e.preventDefault();
        console.log(shelf)
        console.log(user)
        console.log(book)
        let token = getAccessToken();
        let data = {
            custom_shelf_status: true,
            book: book.id,
            shelf: shelf,
            user: user.user_id

            // name: shelfName,
            // user: user.user_id
        }
        console.log(data)
        await axios.post(`${URL}api_books/add_book_to_shelf/`,
            data,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((result) => {
                console.log(result.data);
                // setShelfName('')
            })
            .catch((error) => {
                console.log(error)
            })
    }


    return (
        <div>
            <h1>Book details page</h1>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>

            <div>
                <h4>Add this book to one of your custom shelves:</h4>
                {/* new form for each shelf */}
                {shelves.length === 0
                ?
                <h5>You don't have any custom shelves</h5>
                :
            <ul>
                {shelves.map((shelf) => (

                    <li key={shelf.id}>
                        <form action="" onSubmit={(e) => handleSubmit(e, shelf.id)}>
                    <div>
                        <p>{shelf.name}</p>
                    </div>
                    <button {...booksCustomShelves.includes(shelf.id) ? 'disabled' : ''}>
                        Add book to this shelf {booksCustomShelves.includes(shelf.id) ? 'disabled bc it includes book' : ''}
                    </button>
                        </form>
                </li>))}
            </ul>
            }

            </div>

            <BookStatus book={book} user={user} id={id}/>

            <ReviewSection book={book}/>


        </div>

    )
}

export default BookDetails;
