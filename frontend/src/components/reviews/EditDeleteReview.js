import React from "react";
import getAccessToken from "../../utils/getToken";
import axios from "axios";
import {URL} from "../../utils/url";

const EditDeleteReview = (props) => {
    const {book, review, handleEditChange} = props;

    const handleEdit = async (e) => {
        e.preventDefault()
        let token = getAccessToken();
        let data = {
            rating: review.rating,
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
    )
}

export default EditDeleteReview;
