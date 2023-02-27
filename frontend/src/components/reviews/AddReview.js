import React, {useContext, useState} from "react";
import getAccessToken from "../../utils/getToken";
import axios from "axios";
import {URL} from "../../utils/url";
import AuthContext from "../../context/AuthContext";

const AddReview = (props) => {
    const {user} = useContext(AuthContext);
    const [content, setContent] = useState('')
    const [rating, setRating] = useState(5)
    const {book} = props;

    const handleSubmit = async (e) => {
        e.preventDefault()
        let token = getAccessToken();
        let data = {
            rating: rating,
            content: content,
            book: book.id,
            user: user.user_id
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
    return (
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
    )
}


export default AddReview;