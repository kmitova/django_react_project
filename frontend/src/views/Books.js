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
                setBooks(books)
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
                // const books = result.data
                console.log(result.data)
                setWantToRead(result.data)
            }
        }
        fetchWantToRead()
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
                            {wantToRead.map((item) => <li key={item.id}>{item.book} <Link to={`/book/${item.book}`}>
                                 to book details
                             </Link></li>)}
                            {/*<li>Book 1</li>*/}
                            {/*<li>Book 2</li>*/}
                        </ul>
                    </div>

                    {/*<SearchBook books={books}/>*/}
                    {/*<AddBook/>*/}
                </section>
            }
        </section>
    );
};

export default Books;
