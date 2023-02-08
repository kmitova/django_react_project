import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";
import {Link} from "react-router-dom";

const UserBookInfo = (props) => {
    const {user} = props;
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
        <div>
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
        </div>
    )
}


export default UserBookInfo;