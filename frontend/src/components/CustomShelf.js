import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";


const CustomShelf = () => {

    const {id} = useParams()
    console.log(id)
    const [shelf, setShelf] = useState(null);

    useEffect(() => {
        const fetchShelf = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_custom_shelf/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            console.log(result)
            if (result.status === 200) {
                console.log(result.data)
                setShelf(result.data)
            }
        };
        fetchShelf()
            .catch(console.error);
    }, [id]);

    return (
        <div>
            <h1>Custom shelf</h1>
            <h1>{shelf.name}</h1>
        </div>
    )
}

export default CustomShelf;