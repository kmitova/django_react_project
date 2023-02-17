import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";

const Shelves = (props) => {
    const [shelves, setShelves] = useState([])

        useEffect(() => {
        const fetchShelves = async () => {
            let token = getAccessToken()
            let result = await axios.get(`${URL}api_books/view_shelves/`,
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
                setShelves(result.data)
            }
        }
        fetchShelves()
            .catch(console.error)
    }, [])
    return (
        <div>
            <h3>Your custom shelves</h3>
            {shelves.length === 0
                ?
                <h5>You don't have any custom shelves</h5>
                :
            <ul>
                {shelves.map((shelf) => (<li key={shelf.id}>{shelf.name}</li>))}
            </ul>
            }
        </div>
    )
}


export default Shelves;