import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";
import UserBookInfo from "./UserBookInfo";


const UserDetails = () => {

    const {id} = useParams()
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_users/user/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            console.log(result)
            if (result.status === 200) {
                console.log(result.data)
                setUser(result.data)
            }
        };
        fetchUser()
            .catch(console.error);
    }, [id]);



    return (
        <div>
            <h1>User details page</h1>
            <h2>{user.username}</h2>
            <h4>{user.email}</h4>
            <UserBookInfo user={user}/>
        </div>

    )
}

export default UserDetails;