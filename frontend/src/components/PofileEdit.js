import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import getAccessToken from "../utils/getToken";

import {URL} from "../utils/url";
import {useParams} from "react-router-dom";

const EditProfile = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams()

    const [profile, setProfile] = useState([])
    const [age, setAge] = useState([])
    const [profilePic, setProfilePic] = useState([])


    useEffect(() => {
        const fetchData = async () => {
        let token = getAccessToken()
        let result = await axios.get(`${URL}api_users/your_profile/${id}`,
        {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                console.log(result.data)
                setProfile(result.data)
                if (result.data.profile) {
                    setAge(result.data.profile.age)
                    setProfilePic(result.data.profile.profile_picture)
                }
            }
        }
        fetchData()
            .catch(console.error)
    }, [id])

    const handleEdit = async (e) => {
        e.preventDefault()
        let token = getAccessToken();
        let data = {
            // rating: review.rating,
            // content: review.content,
            // id: review.id,
            // book: book.id

        }
        console.log(data)
        await axios.put(`${URL}api_accounts/edit_profile/${profile.id}/`,
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

    const handleEditChange = (e) => {
        // setReview({
        //     ...review,
        //     [e.target.name]: e.target.value
        // });
    };

    return (
        <section>
            {user && <UserInfo user={user}/>}
            <h1>Users page</h1>
            {!user ? <h2>login to see the users page</h2> :
                <section>
                    <h2>Hello, {profile.username}</h2>
                    <h1>Edit profile:</h1>
                    <form action="" onSubmit={handleEdit}>
                        <div>
                           <label htmlFor="">Username:</label>
                            <input type="text" defaultValue={profile.username} onChange={handleEditChange}/>
                        </div>
                        <div>
                           <label htmlFor="">First name:</label>
                            <input type="text" defaultValue={profile.firstName} onChange={handleEditChange}/>
                        </div>
                        <div>
                           <label htmlFor="">Last name:</label>
                            <input type="text" defaultValue={profile.lastName} onChange={handleEditChange}/>
                        </div>
                        <div>
                           <label htmlFor="">Email:</label>
                            <input type="email" defaultValue={profile.email} onChange={handleEditChange}/>
                        </div>
                        <div>
                           <label htmlFor="">Your Bio:</label>
                            <textarea name="" id="" cols="30" rows="10" defaultValue={profile.bio} onChange={handleEditChange}></textarea>
                        </div>
                        <div>
                           <label htmlFor="">Profile Picture:</label>
                            <input type="file" id="myFile" name="filename" defaultValue={profilePic} onChange={handleEditChange}/>
                        </div>

                        <button>Edit and Save Changes</button>
                    </form>

                </section>

            }

        </section>
    );
};

export default EditProfile;