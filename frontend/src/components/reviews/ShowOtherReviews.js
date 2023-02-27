import {Link} from "react-router-dom";
import React from "react";

const ShowOtherReviews = (props) => {
    const {reviews} = props
    return (
        <div>
             {reviews.length}
            {reviews.map((review) => <li key={review.id}>{review.content} by <Link to={`/user/${review.user.id}`}>{review.user.username}</Link>
                <form action="">
                    <label htmlFor="">Leave a comment on this review</label>
                    <textarea name="" id="" cols="30" rows="10"></textarea>
                    <button>Comment</button>
                </form>
            </li>)}
        </div>
    )
}

export default ShowOtherReviews;