import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";
import {Link} from "react-router-dom";

const UserBookInfo = (props) => {
    const {user} = props;
    console.log(user)
    const [userId, setUserId] = useState(null)
    const [person, setPerson] = useState(null)


    useEffect(() => {
        if (user.hasOwnProperty('id')) {
            setUserId(user.id);
            setPerson(prev => user.username)
        } else {
            setUserId(user.user_id);
            setPerson(prev => "You")
        }
    }, [person, user, userId])

    const [books, setBooks] = useState([])
    const [wantToRead, setWantToRead] = useState([])
    const [currentlyReading, setCurrentlyReading] = useState([])
    const [hasRead, setHasRead] = useState([])
    const [reviews, setReviews] = useState([])


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
                const filtered = result.data.filter(item => {
                    console.log(item.user, userId)
                    return item.user === userId;
                })
                console.log(filtered)
                setWantToRead(prevState => filtered)
            }
        }
        fetchWantToRead()
            .catch(console.error)
    }, [userId])

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
                const filtered = result.data.filter(item => {
                    console.log(item.user, userId)
                    return item.user === userId;
                })
                console.log(filtered)
                setCurrentlyReading(prevState => filtered)
            }
        }
        fetchCurrentlyReading()
            .catch(console.error)
    }, [userId]);

    useEffect(() => {
        const fetchHasRead = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_book_status/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                console.log(result.data)
                const filtered = result.data.filter(item => {
                    console.log(item.user, userId)

                    return item.user === userId && item.is_read === true
                })
                console.log(filtered)
                setHasRead(prevState => filtered)
            }
        }
        fetchHasRead()
            .catch(console.error)
    }, [userId]);

    useEffect(() => {
        const fetchReviews = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/show_reviews_of_user/${userId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                console.log(result.data)
                setReviews(prevState => result.data)
            }
        }
        fetchReviews()
            .catch(console.error)
    }, [userId]);


    return (
        <div>
            <div>
                <h1>{person} {person === "You" ? "Want" : "Wants"} to Read:</h1>
                <ul>
                    {wantToRead.map((item) => <li key={item.id}>{item.book.title} by {item.book.author} <Link
                        to={`/book/${item.book.id}`}>
                        to book details
                    </Link></li>)}
                </ul>
            </div>
            <div>
                <h1>{person} {person === "You" ? "Are" : "Is"} Currently Reading:</h1>
                <ul>
                    {currentlyReading.map((item) => <li key={item.id}>{item.book.title} by {item.book.author} <Link
                        to={`/book/${item.book.id}`}>
                        to book details
                    </Link></li>)}
                </ul>
            </div>
            <div>
                <h1>{person} {person === "You" ? "Have" : "Has"} Read:</h1>
                <ul>
                    {hasRead.map((item) => <li key={item.id}>{item.book.title} by {item.book.author} <Link
                        to={`/book/${item.book.id}`}>
                        to book details
                    </Link></li>)}
                </ul>
            </div>
            <div>
                <h1>{person} {person === "You" ? "Have" : "Has"} Reviewed:</h1>
                <ul>
                    {reviews.map((item) => <li
                        key={item.id}>{item.content} on {item.book.title} by {item.book.author} with
                        rating {item.rating} out of 5</li>)}
                </ul>
            </div>

        </div>
    )
}


export default UserBookInfo;