import React, {useState} from 'react';
import axios from "axios";
import getAccessToken from "../utils/getToken";
import {URL} from "../utils/url";


const SearchBook = (props) => {
    const {books} = props;
    const [searchTerm, setSearchTerm] = useState('')
    const [bookIsRead, setBooksIsRead] = useState(false)


    const changeStatus = async (e, book) => {
        e.preventDefault();
        setBooksIsRead(e.target.checked)
        let token = getAccessToken()
        let data = {
            is_read: bookIsRead
        }
        console.log(data)
        await axios.put(`${URL}api_books/change_book_status/${book.id}/`,
            data, {
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
        <div className='search-container'>
            <input type="text" placeholder='Search for a title...'
                   onChange={(e) => {
                       setSearchTerm(e.target.value)
                   }}/>
            {books
                .filter((book) => {
                    if (book.title.toLowerCase().includes(searchTerm)) {
                        return book
                    } else {
                        return ''
                    }
                })
                .map((book) => (
                        <div key={book.id}>
                            <p>{book.title}</p>
                            <p>{book.author}</p>
                            <form action="">
                                <label htmlFor="">Book is read</label>
                                {book.is_read ?
                                    <input type="checkbox" name="is_read" checked
                                           onChange={(e) => changeStatus(e, book)}/> :
                                    <input type="checkbox" name="is_read" onChange={(e) => changeStatus(e, book)}/>}
                            </form>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default SearchBook;

