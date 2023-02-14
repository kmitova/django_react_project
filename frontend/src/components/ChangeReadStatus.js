import React, {useEffect, useState} from "react";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";

const ChangeReadStatus = (props) => {
    const {changeStatus, changeBookIsReadStatus, bookIsRead} = props;
    // const bookId = book.id
    //
    // const [bookIsRead, setBooksIsRead] = useState(false)
    // const [isReadObject, setIsReadObject] = useState(null)
    // const [changeIsRead, setChangeIsRead] = useState(false)
    //
    // useEffect(() => {
    //     const fetchBookStatus = async () => {
    //         let token = getAccessToken();
    //         let result = await axios.get(`${URL}api_books/view_book_status/${id}/`, {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer  ${token}`
    //             }
    //         });
    //         if (result.status === 200) {
    //             if (result.data.length > 0) {
    //                 let relevantData = result.data[result.data.length - 1]
    //                 console.log(relevantData)
    //                 setBooksIsRead(prevState => relevantData.is_read)
    //                 setIsReadObject(prevState => relevantData)
    //             }
    //         }
    //     };
    //     fetchBookStatus()
    //         .catch(console.error);
    // }, [id]);
    //
    // const changeStatus = async (e, book) => {
    //     e.preventDefault();
    //     // setBooksIsRead(e.target.checked)
    //     let token = getAccessToken()
    //     let data = {
    //         book: bookId,
    //         user: user.user_id,
    //         is_read: bookIsRead
    //     }
    //     console.log(data)
    //     if (isReadObject !== null) {
    //         await axios.delete(`${URL}api_books/edit_book_status/${isReadObject.id}/`,
    //         {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             }, data
    //         })
    //         .then((result) => {
    //             setBooksIsRead(false)
    //             console.log('success, delete request')
    //             console.log(result.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     } else {
    //        await axios.post(`${URL}api_books/change_book_status/`,
    //         data, {
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         })
    //         .then((result) => {
    //             console.log(result.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     }
    //
    // }
    return (
        <form action="" onSubmit={changeStatus}>
            <button onClick={changeBookIsReadStatus}>
                {/*{bookIsRead*/}
                {/*    ?*/}
                {/*    "Remove from read"*/}
                {/*    :*/}
                {/*    "Add to read"}*/}
                finish book
            </button>
        </form>
    )
}

export default ChangeReadStatus;