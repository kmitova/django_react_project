import AddReview from "./AddReview";
import React, {useEffect, useState} from "react";
import getAccessToken from "../../utils/getToken";
import axios from "axios";
import {URL} from "../../utils/url";
import EditDeleteReview from "./EditDeleteReview";
import ShowOtherReviews from "./ShowOtherReviews";


// IMPORTANT: PAGE SHOWS CORRECT REVIEW AFTER REFRESHING
const ReviewSection = (props) => {
    const { book } = props;
    const [review, setReview] = useState('')
    const [reviews, setReviews] = useState([])


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
                console.log(result.data)
                    for (let i of result.data) {
                        console.log(i.book, book.id)
                        if (i.book === book.id) {
                            setReview(i)
                            break
                        }
                    }
                }
                else {
                    console.log('no review of this book from this user yet')
                }
            }

        fetchReview()
            .catch(console.error)
    }, [book.id])

    useEffect(() => {
        const fetchOtherReviews = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/show_other_reviews/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            })
            if (result.status === 200) {
                console.log(result.data)
                    for (let i of result.data) {
                        console.log(i.book, book.id)
                        if (i.book === book.id) {
                            setReviews(prevState => [...prevState, i])
                        }
                        console.log(reviews)
                    }
                }
                else {
                    console.log('no review of this book from this user yet')
                }
        }
        fetchOtherReviews()
        .catch(console.error)
    }, [book.id])



    const handleEditChange = (e) => {
        setReview({
            ...review,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div>
            {review === ''
                ?
                <AddReview book={book}/>
                :
                <div>
                    <h2>Your review of {book.title}</h2>
                    <EditDeleteReview book={book} review={review} handleEditChange={handleEditChange}/>
                </div>}
            <ShowOtherReviews book={book} reviews={reviews}/>


        </div>
    )
}

export default ReviewSection;