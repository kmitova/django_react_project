import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Books = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([])

    const url = 'http://127.0.0.1:8000/'
  useEffect(() => {
    fetchData()
  }, [])

  function getAccessToken() {
        let result = window.localStorage.getItem('authTokens');
        if (!result) {
            return "";
        }
        return JSON.parse(result).access;
    }

  async function fetchData() {
    let token = getAccessToken();

    console.log(token)

    let result = await axios.get(`${url}api_books/books/`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer  ${token}`
      }
    });
    // console.log(result)
    if (result.status === 200) {
      const books = result.data
      // console.log(result.data)
      console.log(books)
      setBooks(books)
      // console.log(result.data)

      return result;
    }

  }

  return (
    <section>
      {user && <UserInfo user={user} />}
      <h1>You are on Books page!</h1>
        {!user ? <h2>login to see your books</h2> : <h2>Book count: {books.length}</h2>}
        <div>
            {books.map(b =>(
            // {console.log(books)}
                <p key={b.id}>{b.title}</p>
            ))}
        </div>
    </section>
  );
};

export default Books;