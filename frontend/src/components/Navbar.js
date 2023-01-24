import {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SearchBook from "./SearchBook";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  console.log(user)
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
    <nav>
      <div>
        <h1>App Name</h1>

        <div>
          {user ? (
            <>
                <SearchBook books={books}/>
              <Link to="/">Home</Link>
              <Link to="/protected">Protected Page</Link>
                <Link to="/books">Books</Link>
                <Link to="/users">Users</Link>
                <Link to={`/your_profile/${user.user_id}`}>Profile</Link>
              <button onClick={logoutUser}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;