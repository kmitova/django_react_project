import React, {useState} from 'react';
import {Link} from "react-router-dom";


const SearchBook = (props) => {
    const {books} = props;
    const [query, setQuery] = useState('')
    const [state, setstate] = useState({
        query: '',
        list: []
    })

    const handleChange = (e) => {
        const results = books.filter(book => {
            if (e.target.value === "") return books
            return book.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }

    return (
        <div>
            <form>
                <input onChange={handleChange} value={state.query} type="search"/>
            </form>
            <ul>
                {(state.query === '' ? "" : state.list.map(book => {
                    // return <li key={book.id}>{book.title}</li>
                    return (<li key={book.id}>
                             <p>{book.title}</p>
                             <p>{book.author}</p>
                             <Link to={`/book/${book.id}`}>
                                 to book details
                             </Link>
                         </li>)
                }))}
            </ul>
        </div>
    )
}

export default SearchBook;

