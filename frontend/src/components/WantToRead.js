import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL, URL as url} from "../utils/url";

const WantToRead = (props) => {
    const {handleWantToRead, changeWantToReadStatus, wantToRead, setChangeWantToRead} = props;

    // const [wantToRead, setWantToRead] = useState(false)
    // const [wantToReadObject, setWantToReadObject] = useState(null)
    // const [changeWantToRead, setChangeWantToRead] = useState(false)

    // useEffect(() => {
    //     const fetchWantToReadStatus = async () => {
    //
    //         let token = getAccessToken();
    //         let result = await axios.get(`${URL}api_books/view_want_to_read/`, {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer  ${token}`
    //             }
    //         });
    //         if (result.status === 200) {
    //             for (let item of result.data) {
    //                 if (item.book.id === book.id) {
    //                     setWantToRead(item.want_to_read)
    //                     setWantToReadObject(prevState => item)
    //                     console.log(item)
    //                     break
    //                 }
    //             }
    //         }
    //     };
    //     fetchWantToReadStatus()
    //         .catch(console.error);
    // }, [book]);
    //
    // const handleWantToRead = async (e) => {
    //     e.preventDefault()
    //     console.log(book)
    //     let token = getAccessToken();
    //     let data = {
    //         user: user.user_id,
    //         book: book.id,
    //         want_to_read: changeWantToRead
    //     }
    //     console.log(data)
    //     console.log(wantToReadObject)
    //     if (wantToReadObject !== null) {
    //         await axios.delete(`${url}api_books/edit_want_to_read/${wantToReadObject.id}/`,
    //             {
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 }, data
    //             })
    //             .then((result) => {
    //                 setWantToRead(false)
    //                 console.log('success, delete request')
    //                 console.log(result.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     } else {
    //         await axios.post(`${url}api_books/want_to_read/`,
    //             data, {
    //                 headers: {
    //                     'Accept': 'application/json',
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${token}`
    //                 }
    //             })
    //             .then((result) => {
    //                 setWantToRead(true)
    //                 console.log('success, post request')
    //                 console.log(result.data);
    //             })
    //             .catch((error) => {
    //                 console.log(error);
    //             })
    //     }
    // }
    return (
        <form action="" onSubmit={handleWantToRead}>
            <button onClick={changeWantToReadStatus}>
                {/*{wantToRead*/}
                {/*    ?*/}
                {/*    "Remove from want to read"*/}
                {/*    :*/}
                {/*    "Add to want to read"}*/}
                add to want to read
            </button>
        </form>
    )
}

export default WantToRead;