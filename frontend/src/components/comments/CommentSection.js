import React, {useEffect, useState} from "react";
import getAccessToken from "../../utils/getToken";
import axios from "axios";
import {URL} from "../../utils/url";
import {Link} from "react-router-dom";
import DateCell from "../DateFormat";
import DateFormatter from "../DateFormat";

const CommentSection = (props) => {
    const {review, user} = props;
    console.log(review)
    const [text, setText] = useState('')

    const [comments, setComments] = useState([])

    useEffect(() => {
        const fetchComments = async () => {
            let token = getAccessToken()
            let result = await axios.get(`${URL}api_books/show_comments/${review.id}/`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer  ${token}`
                    }
                }
                );
            if (result.status === 200) {
                console.log(result.data)
                setComments(result.data)
            }
        }
        fetchComments()
            .catch(console.error)
    }, [])

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
        <section>
            <div>
                {comments.length === 0 ?
                <h4>No comments on this review yet.</h4>
                :
                    comments.map((comment) => (<li key={comment.id}>{comment.text} by {comment.user.username} on <DateFormatter date={comment.publication_date}/></li>))
                }
            </div>
            <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="">Leave a comment on this review {review.id}
                    </label>
                    <textarea value={text} name="" id="" cols="30" rows="10" onChange={(e) => setText(e.target.value)}></textarea>
                    <button>Comment</button>
        </form>
        </section>

    )
}

export default CommentSection;