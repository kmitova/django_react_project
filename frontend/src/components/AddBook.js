import React, {useState} from 'react';
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";


const AddBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        let token = getAccessToken();
        let data = {
            title: title,
            author: author,
        }

        console.log(data)
        await axios.post(`${URL}api_books/add_book/`,
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
                <button className="submit-btn">
                    Add book
                </button>
            </form>
        </div>
    )
}


export default AddBook;