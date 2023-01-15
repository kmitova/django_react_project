import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";


const BookDetails = () => {
    const {id} = useParams()
    const [book, setBook] = useState([]);

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
                console.log(result)
                console.log(result.data)
                setBook(result.data)
            }
    };
    fetchBook()
        .catch(console.error);
  }, [id]);

    return (
        <div>
            <h1>Book details page</h1>
            <h2>{book.title}</h2>
            <h3>{book.author}</h3>
        </div>

    )
}

export default BookDetails;