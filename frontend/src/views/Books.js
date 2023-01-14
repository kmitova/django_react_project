import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Books = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])

  // const [newBook, setNewBook]= useState({})
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState(1)
  const [isRead, setIsRead] = useState(false)

    const [bookIsRead, setBooksIsRead] = useState(false)

    const url = 'http://127.0.0.1:8000/'
  useEffect(() => {
    fetchData()
  }, [])

  useEffect( () => {
    async function fetchCategories() {
      let token = getAccessToken();
    console.log(token)

    let result = await axios.get(`${url}api_books/categories/`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer  ${token}`
      }
    });
    console.log(result)
    if (result.status === 200) {
      const allCategories = result.data
      setCategories(allCategories)
      console.log(result.data)
      return result;
    }
    }
    fetchCategories()

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


  const handleSubmit = async (e) => {
    e.preventDefault()

      let token = getAccessToken();
    let data = {
        title: title,
          author: author,
          // category: category,
          is_read: isRead,
    }
    console.log(categories)
    console.log(data)
      await axios.post(`${url}api_books/add_book/`,
          data,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        })
      .then((result) => {
            // console.log(category)
                console.log(result.data);
            })
            .catch((error) => {
                // console.log(category)
                console.log(error);
            })
  }

  // edit book status in backend too
  const changeStatus = async(e, book) => {
      e.preventDefault();
      setBooksIsRead(e.target.checked)
      let token = getAccessToken()
      let data = {
          is_read: bookIsRead
      }
      console.log(data)
      await axios.put(`${url}api_books/change_book_status/${book.id}/`,
          data,{
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        })
      .then((result) => {
            // console.log(category)
                console.log(result.data);
            })
            .catch((error) => {
                // console.log(category)
                console.log(error);
            })


  }


  return (
    <section>
      {user && <UserInfo user={user} />}
      <h1>You are on Books page!</h1>
        {!user ? <h2>login to see your books</h2> : <h2>Book count: {books.length}</h2>}
        <div>
            {books.map(b =>(
                <div key={b.id}>
                     <p>{b.title}</p>
                    <p>{b.author}</p>
                    <form action="">
                        <label htmlFor="">Book is read</label>

                        {b.is_read ? <input type="checkbox" name="is_read" checked onChange={(e) => changeStatus(e, b)}/> : <input type="checkbox" name="is_read" onChange={(e) => changeStatus(e, b)}/>}
                    </form>
                </div>

            ))}
        </div>
      <div>
        <form
      onSubmit={handleSubmit}
      method="POST"
      target="_blank"
      >
          <h2>Add a book</h2>
          <div className="form-group">
            <label htmlFor="">title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="">author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
          </div>
          {/* <div className="form-group">*/}
          {/*  <label htmlFor="">category</label>*/}
          {/*  <select id="categories" value={category} onChange={getCategory}>*/}

          {/*    {categories.map(category => (*/}
          {/*        <option key={category.id} value={(category.id).toString()}>{category.name}</option>*/}
          {/*    )*/}
          {/*    )}*/}
          {/*  </select>*/}
          {/*</div>*/}
          {/*  <div>Selected value is : {category}</div>*/}
          <div className="form-group">
            <label htmlFor="">Book is read</label>
            <select id="categories" value={isRead} onChange={(e) => setIsRead((e.target.value))}>
              <option value='true'>True</option>
              <option value='false'>False</option>
            </select>
          </div>
          <button className="submit-btn">
            Add book
          </button>
        </form>
      </div>
    </section>
  );
};

export default Books;











// import {useContext, useEffect, useState} from "react";
// import UserInfo from "../components/UserInfo";
// import AuthContext from "../context/AuthContext";
// import axios from "axios";
//
// const Books = () => {
//   const { user } = useContext(AuthContext);
//   const [books, setBooks] = useState([])
//
//     const url = 'http://127.0.0.1:8000/'
//   useEffect(() => {
//     fetchData()
//   }, [])
//
//   function getAccessToken() {
//         let result = window.localStorage.getItem('authTokens');
//         if (!result) {
//             return "";
//         }
//         return JSON.parse(result).access;
//     }
//
//   async function fetchData() {
//     let token = getAccessToken();
//
//     console.log(token)
//
//     let result = await axios.get(`${url}api_books/books/`,{
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer  ${token}`
//       }
//     });
//     // console.log(result)
//     if (result.status === 200) {
//       const books = result.data
//       // console.log(result.data)
//       console.log(books)
//       setBooks(books)
//       // console.log(result.data)
//
//       return result;
//     }
//
//   }
//
//   return (
//     <section>
//       {user && <UserInfo user={user} />}
//       <h1>You are on Books page!</h1>
//         {!user ? <h2>login to see your books</h2> : <h2>Book count: {books.length}</h2>}
//         <div>
//             {books.map(b =>(
//             // {console.log(books)}
//                 <p key={b.id}>{b.title}</p>
//             ))}
//         </div>
//     </section>
//   );
// };
//
// export default Books;