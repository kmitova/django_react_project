import React, {useContext, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import UserBookInfo from "../components/UserBookInfo";
import getAccessToken from "../utils/getToken";
import {URL} from "../utils/url";
import axios from "axios";
import Shelves from "../components/Shelves";

const Books = () => {
    const {user} = useContext(AuthContext);
    const [shelfName, setShelfName] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = getAccessToken();
        let data = {
            name: shelfName,
            user: user.user_id
        }
        console.log(data)
        await axios.post(`${URL}api_books/add_shelf/`,
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
                setShelfName('')
            })
            .catch((error) => {
                console.log(error)
            })
    }



    return (
        <section>
            {user && <UserInfo user={user}/>}
            {!user ? <h2>login to see your books</h2> :
                <section>
                    <UserBookInfo user={user} />
                    <section>
                        <Shelves />
                        <form action="" onSubmit={handleSubmit}>
                            <h4>Add a new shelf</h4>
                            <div>
                                <label htmlFor="">Shelf name:</label>
                                <input type="text" value={shelfName} onChange={(e) => setShelfName(e.target.value)}/>
                            </div>
                            <button>Add</button>
                        </form>
                    </section>
                </section>
            }
        </section>
    );
};

export default Books;
