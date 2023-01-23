import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import getAccessToken from "../utils/getToken";

import {URL} from "../utils/url";
import {useParams} from "react-router-dom";

const ProfilePage = () => {
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

    return (
        <section>
            {user && <UserInfo user={user}/>}
            <h1>Users page</h1>
            {!user ? <h2>login to see the users page</h2> :
                <section>
                    <h1>Your profile:</h1>
                    <p>{profile.username}</p>
                    <p>{profile.email}</p>
                    <p>{age}</p>
                    <p>{profilePic}</p>
                </section>
            }

        </section>
    );
};

export default ProfilePage;