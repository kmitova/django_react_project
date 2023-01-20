import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import getAccessToken from "../utils/getToken";

import {URL} from "../utils/url";

const Users = () => {
    const {user} = useContext(AuthContext);

    const [users, setUsers] = useState([])


    useEffect(() => {
        const fetchData = async () => {
        let token = getAccessToken()
        let result = await axios.get(`${URL}api_users/users/`,
        {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                console.log(result.data)
                setUsers(result.data)
            }
        }
        fetchData()
            .catch(console.error)
    }, [])

    return (
        <section>
            {user && <UserInfo user={user}/>}
            <h1>Users page</h1>
            {!user ? <h2>login to see the users page</h2> :
                <section>
                    <h2>Users:</h2>
                    <ul>
                       {users.map((user) => (<li key={user.id}>{user.username}</li>))}
                    </ul>
                </section>
            }

        </section>
    );
};

export default Users;
