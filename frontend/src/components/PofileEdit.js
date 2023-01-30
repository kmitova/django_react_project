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
    const [username, setUsername] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [profilePicture, setProfilePicture] = useState(null)

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
                setUsername(result.data.username)
                setFirstName(result.data.first_name)
                setLastName(result.data.last_name)
                setBio(result.data.bio)
                setProfilePicture(result.data.profile_picture)
                console.log(result.data.profile_picture)
            }
        }
        fetchData()
            .catch(console.error)
    }, [id])

    const handleProfileEdit = async (e) => {
        e.preventDefault()
        console.log('clicked')
        let token = getAccessToken();
        let data = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            bio: bio,
            profile_picture: profilePicture
        }
        console.log(data)
        await axios.put(`${URL}api_users/edit_profile/${profile.id}/`,
            data, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((result) => {
                console.log('success')
                console.log(result.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }

    return (
        <section>
            {user && <UserInfo user={user}/>}
            <h1>Users page</h1>
            {!user ? <h2>login to see the users page</h2> :
                <section>
                    <h2>Hello, {profile.username}</h2>
                    <h1>Edit profile:</h1>
                    <form action="" onSubmit={handleProfileEdit}>
                        <div>
                           <label htmlFor="">Username:</label>
                            <input name='username' type="text" defaultValue={profile.username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">First name:</label>
                            <input name='firstName' type="text" defaultValue={profile.first_name} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">Last name:</label>
                            <input name='lastName' type="text" defaultValue={profile.last_name} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">Email:</label>
                            <input name='email' type="email" defaultValue={profile.email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">Your Bio:</label>
                            <textarea name="bio" id="" cols="30" rows="10" defaultValue={profile.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                        </div>
                        <div>
                           <label htmlFor="">Profile Picture:</label>
                            <input name='profile picture' type="file" id="myFile"
                                   // defaultValue={profile.profile_picture}
                                   onChange={(e) => {console.log(e.target.files[0])
                                       setProfilePicture(e.target.files[0])}}/>
                        </div>
                        <button>Edit and Save Changes</button>
                    </form>

                </section>

            }

        </section>
    );
}

export default EditProfile;
