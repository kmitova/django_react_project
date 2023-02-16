import React, {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import UserBookInfo from "../components/UserBookInfo";
import getAccessToken from "../utils/getToken";
import {URL} from "../utils/url";
import axios from "axios";

const Books = () => {
    const {user} = useContext(AuthContext);
    const [shelves, setShelves] = useState([])
    const [shelfName, setShelfName] = useState('')

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
    }, [shelves])

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
