import React, {useState} from "react";
import getAccessToken from "../../utils/getToken";
import axios from "axios";
import {URL} from "../../utils/url";

const CommentSection = (props) => {
    const {review, user} = props;
    console.log(review)
    const [text, setText] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = getAccessToken();
        let data = {
            text: text,
            user: user.user_id,
            review: review.id
        }
        console.log(data)
        await axios.post(`${URL}api_books/add_comment/`,
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
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Leave a comment on this review {review.id}
                    </label>
                    <textarea value={text} name="" id="" cols="30" rows="10" onChange={(e) => setText(e.target.value)}></textarea>
                    <button>Comment</button>
                    {/*{() => setReviewId(review.id)}*/}
        </form>
    )
}

export default CommentSection;