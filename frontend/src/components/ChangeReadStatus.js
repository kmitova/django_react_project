import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";

const ChangeReadStatus = (props) => {
    const {book, user, id} = props;
    console.log(book)
    const bookId = book.id

    const [bookIsRead, setBooksIsRead] = useState(false)

    useEffect(() => {
        const fetchBookStatus = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/view_book_status/${id}/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                if (result.data.length > 0) {
                    let relevantData = result.data[result.data.length - 1]
                    console.log(relevantData)
                    setBooksIsRead(prevState => relevantData.is_read)
                }
            }
        };
        fetchBookStatus()
            .catch(console.error);
    }, [id]);

    const changeStatus = async (e, book) => {
        e.preventDefault();
        // setBooksIsRead(e.target.checked)
        let token = getAccessToken()
        let data = {
            book: bookId,
            user: user.user_id,
            is_read: bookIsRead
        }
        console.log(data)
        await axios.post(`${URL}api_books/change_book_status/${bookId}/`,
            data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((result) => {
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <form action="" onSubmit={changeStatus}>
            <button onClick={()=> setBooksIsRead(!bookIsRead)}>
                {bookIsRead
                    ?
                    "Remove from read"
                    :
                    "Finish reading"}
            </button>
        </form>
        // <form action="">
        //     <label htmlFor="">Book is read</label>
        //     {bookIsRead ?
        //         <input type="checkbox" name="is_read" checked
        //                onChange={(e) => changeStatus(e, book)}/> :
        //         <input type="checkbox" name="is_read" onChange={(e) => changeStatus(e, book)}/>}
        //     {/*  add submit button  */}
        // </form>
    )
}

export default ChangeReadStatus;