import React, {useState} from 'react';
import {Link} from "react-router-dom";


const SearchBook = (props) => {
    const {books} = props;
    const [searchTerm, setSearchTerm] = useState('')

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
                            <Link to={`/book/${book.id}`}>
                                to book details
                            </Link>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default SearchBook;

