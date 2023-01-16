import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import SearchBook from "../components/SearchBook";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import getAccessToken from "../utils/getToken";
import AddBook from "../components/AddBook";
import {URL} from "../utils/url";

const Books = () => {
    const {user} = useContext(AuthContext);
    const [books, setBooks] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/books/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                const books = result.data
                console.log(books)
                setBooks(books)
            }
        }
        fetchData()
            .catch(console.error)
    }, [])

    return (
        <section>
            {user && <UserInfo user={user}/>}
            {!user ? <h2>login to see your books</h2> :
                <section>
                    <h2>Book count: {books.length}</h2>
                    <SearchBook books={books}/>
                    <AddBook/>
                </section>
            }
        </section>
    );
};

export default Books;
