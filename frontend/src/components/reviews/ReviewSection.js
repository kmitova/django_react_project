import AddReview from "./AddReview";
import React, {useEffect, useState} from "react";
import getAccessToken from "../../utils/getToken";
import axios from "axios";
import {URL} from "../../utils/url";
import EditDeleteReview from "./EditDeleteReview";

const ReviewSection = (props) => {
    const {book} = props;
    const [review, setReview] = useState('')


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
        </div>
    )
}

export default ReviewSection;