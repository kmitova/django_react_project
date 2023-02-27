import {Link} from "react-router-dom";
import React, {useContext, useState} from "react";
import getAccessToken from "../../utils/getToken";
import axios from "axios";
import {URL} from "../../utils/url";
import AuthContext from "../../context/AuthContext";
import CommentSection from "../comments/CommentSection";

const ShowOtherReviews = (props) => {
    const {reviews} = props
    const {user} = useContext(AuthContext);


    return (
        <div>
             {reviews.length}
            {reviews.map((review) => <li key={review.id}>{review.content} by <Link to={`/user/${review.user.id}`}>{review.user.username}</Link>
                <CommentSection user={user} review={review} />
            </li>)}
        </div>
    )
}

export default ShowOtherReviews;