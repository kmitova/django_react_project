import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";


const BookDetails = () => {
    const {id} = useParams()
    const [book, setBook] = useState([]);
    const [bookIsRead, setBooksIsRead] = useState(false)

    const [content, setContent] = useState('')
    const [rating, setRating] = useState('')

    const [review, setReview] = useState('')

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
                setBook(result.data)
            }
        };
        fetchBook()
            .catch(console.error);
    }, [id]);

    useEffect(() => {
        const fetchReview = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/show_review/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            })
            if (result.status === 200) {
                if (result.data.length === 1) {
                    setReview(result.data[0])
                } else {
                    console.log('no review of this book yet')
                }
            }
        };
        fetchReview()
            .catch(console.error)
    }, [])


    const changeStatus = async (e, book) => {
        e.preventDefault();
        setBooksIsRead(e.target.checked)
        let token = getAccessToken()
        let data = {
            is_read: bookIsRead
        }
        console.log(data)
        await axios.put(`${URL}api_books/change_book_status/${book.id}/`,
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        let token = getAccessToken();
        let data = {
            rating: rating,
            content: content,
            book: book.id
        }
        console.log(data)
        await axios.post(`${URL}api_books/add_review/`,
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

    const handleEdit = async (e) => {
        e.preventDefault()
        let token = getAccessToken();
        let data = {
            rating: review.rating !== undefined ? review.rating : rating,
            content: review.content,
            id: review.id,
            book: book.id

        }
        console.log(data)
        await axios.put(`${URL}api_books/edit_review/${review.id}/`,
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

    const handleEditChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        });
    };

    const deleteReview = async (e) => {
        e.preventDefault()
        let token = getAccessToken();
        let data = {
            id: review.id,
        }
        console.log(data)
        await axios.delete(`${URL}api_books/delete_review/${review.id}/`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data
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
                {book.is_read ?
                    <input type="checkbox" name="is_read" checked
                           onChange={(e) => changeStatus(e, book)}/> :
                    <input type="checkbox" name="is_read" onChange={(e) => changeStatus(e, book)}/>}
            </form>
            {review === '' ?
                <form action="" onSubmit={handleSubmit}>
                    <h3>Review this book:</h3>
                    <div>
                        <label htmlFor="">Rating</label>
                        <select name="" id="" value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="5">5 stars</option>
                            <option value="4">4 stars</option>
                            <option value="3">3 stars</option>
                            <option value="2">2 stars</option>
                            <option value="1">1 star</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Review:</label>
                        <textarea name="" id="" cols="30" rows="10" value={content}
                                  onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <button>Post Review</button>
                </form>
                : <div>
                    <h2>Your review of {book.title}</h2>
                    <form action="" onSubmit={handleEdit}>

                        <div>
                            <label htmlFor="">Rating</label>
                            <select name="rating" id="" defaultValue={review.rating} onChange={handleEditChange}>
                                <option value="5">5 stars</option>
                                <option value="4">4 stars</option>
                                <option value="3">3 stars</option>
                                <option value="2">2 stars</option>
                                <option value="1">1 star</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="">Review:</label>
                            <textarea name="content" id="" cols="30" rows="10" defaultValue={review.content}
                                      onChange={handleEditChange}></textarea>
                        </div>
                        <button>Edit review</button>
                        <button onClick={deleteReview}>Delete review</button>
                    </form>
                </div>}
        </div>

    )
}

export default BookDetails;