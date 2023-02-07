import React, {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
// import SearchBook from "../components/SearchBook";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import getAccessToken from "../utils/getToken";
// import AddBook from "../components/AddBook";
import {URL} from "../utils/url";
import {Link} from "react-router-dom";

const Books = () => {
    const {user} = useContext(AuthContext);
    const [books, setBooks] = useState([])
    const [wantToRead, setWantToRead] = useState([])
    const [currentlyReading, setCurrentlyReading] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/books/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                const books = result.data
                console.log(books)
                setBooks(prevState => books)
            }
        }
        fetchData()
            .catch(console.error)
    }, [])

    useEffect(() => {
        const fetchWantToRead = async () => {
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

                setWantToRead(prevState => result.data)
                // let ids = result.data.map((item) => item.book)
                // console.log(ids)
                // bookIds = ids
                // console.log(books)
                // for (let book of books) {
                //     console.log(book)
                //     console.log(book.id, ids)
                //     if (ids.includes(book.id)) {
                //         setWantToRead(...wantToRead, book)
                //     }
                // }
                // bookIds.push(result.data.book)
            }
        }
        fetchWantToRead()
            .catch(console.error)
    }, [])

    useEffect(() => {
        const fetchCurrentlyReading = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_currently_reading/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                console.log(result.data)

                setCurrentlyReading(prevState => result.data)
            }
        }
        fetchCurrentlyReading()
            .catch(console.error)
    }, [])

    return (
        <section>
            {user && <UserInfo user={user}/>}
            {!user ? <h2>login to see your books</h2> :
                <section>
                    <h2>Book count: {books.length}</h2>
                    <div>
                        <h1>You Want to Read:</h1>
                        <ul>
                            {wantToRead.map((item) => <li key={item.id}>{item.book.title} by {item.book.author} <Link to={`/book/${item.book.id}`}>
                                 to book details
                             </Link></li>)}
                        </ul>
                    </div>
                    <div>
                        <h1>You are currently reading:</h1>
                        <ul>
                            {currentlyReading.map((item) => <li key={item.id}>{item.book.title} by {item.book.author} <Link to={`/book/${item.book.id}`}>
                                 to book details
                             </Link></li>)}
                        </ul>
                    </div>
                </section>
            }
        </section>
    );
};

export default Books;
