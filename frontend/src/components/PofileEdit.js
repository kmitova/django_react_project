import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import getAccessToken from "../utils/getToken";

import {URL} from "../utils/url";
import {useLocation, useParams} from "react-router-dom";

const EditProfile = () => {
    const {user} = useContext(AuthContext);
    const {id} = useParams()
    const location = useLocation();
    const profile = location.state;
    console.log(profile)
    console.log(profile.profile.username)
    console.log(profile.profile.first_name)
    console.log(profile.profile.profile.age)

    const [username, setUsername] = useState(profile.profile.username)
    const [firstName, setFirstName] = useState(profile.profile.first_name)
    const [lastName, setLastName] = useState(profile.profile.last_name)
    const [email, setEmail] = useState(profile.profile.email)
    const [bio, setBio] = useState(profile.profile.profile.bio)

    const handleProfileEdit = async (e) => {
        e.preventDefault()
        console.log('clicked')
        let token = getAccessToken();
        let data = {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: email,
            profile: {
                bio: bio
            }
            // bio: bio
            // rating: review.rating,
            // content: review.content,
            // id: review.id,
            // book: book.id
            // username: username,
            // first_name: firstName,
            // last_name: lastName,

            // firstName: profile.


        }
        console.log(data)
        await axios.put(`${URL}api_users/edit_profile/${profile.profile.id}/`,
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
                    <h2>Hello, {profile.profile.username}</h2>
                    <h1>Edit profile:</h1>
                    <form action="" onSubmit={handleProfileEdit}>
                        <div>
                           <label htmlFor="">Username:</label>
                            <input name='username' type="text" defaultValue={profile.profile.username} onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">First name:</label>
                            <input name='firstName' type="text" defaultValue={profile.profile.first_name} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">Last name:</label>
                            <input name='lastName' type="text" defaultValue={profile.profile.last_name} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">Email:</label>
                            <input name='email' type="email" defaultValue={profile.profile.email} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                           <label htmlFor="">Your Bio:</label>
                            <textarea name="bio" id="" cols="30" rows="10" defaultValue={profile.profile.profile.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                        </div>
                        {/*<div>*/}
                        {/*   <label htmlFor="">Profile Picture:</label>*/}
                        {/*    <input name='profile picture' type="file" id="myFile" defaultValue={profile.profile.profile.profile_picture}/>*/}
                        {/*</div>*/}
                        <button>Edit and Save Changes</button>
                    </form>

                </section>

            }

        </section>
    );
}

export default EditProfile;
// const EditProfile = () => {
//     const {user} = useContext(AuthContext);
//     const {id} = useParams()
//
//     const [profile, setProfile] = useState([])
//     const [age, setAge] = useState([])
//     const [bio, setBio] = useState('')
//     const [profilePic, setProfilePic] = useState([])
//
//     const [username, setUsername] = useState(profile.username)
//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState(profile.last_name)
//
//     console.log(firstName)
//     console.log(profile.username)
//
//     // SENDS REQUEST BUT NOT WITH THE DATA FROM THE FORM
//
//     useEffect(() => {
//         const fetchData = async () => {
//         let token = getAccessToken()
//         let result = await axios.get(`${URL}api_users/your_profile/${id}`,
//         {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer  ${token}`
//                 }
//             });
//             if (result.status === 200) {
//                 console.log(result.data)
//                 setProfile(result.data)
//                 if (result.data.profile) {
//                     setAge(result.data.profile.age)
//                     setBio(result.data.profile.bio)
//                     setProfilePic(result.data.profile.profile_picture)
//                 }
//             }
//         }
//         fetchData()
//             .catch(console.error)
//     }, [id])
//
//     const handleEdit = async (e) => {
//         e.preventDefault()
//         let token = getAccessToken();
//         let data = {
//             // rating: review.rating,
//             // content: review.content,
//             // id: review.id,
//             // book: book.id
//             username: username,
//             first_name: firstName,
//             // last_name: lastName,
//
//             // firstName: profile.
//
//
//         }
//         console.log(data)
//         await axios.put(`${URL}api_users/edit_profile/${profile.id}/`,
//             data, {
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//             .then((result) => {
//                 console.log(result.data);
//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//
//     }
//
//     const handleEditChange = (e) => {
//         setProfile({
//             ...profile,
//             [e.target.name]: e.target.value
//         });
//     };
//
//
//     return (
//         <section>
//             {user && <UserInfo user={user}/>}
//             <h1>Users page</h1>
//             {!user ? <h2>login to see the users page</h2> :
//                 <section>
//                     <h2>Hello, {profile.username}</h2>
//                     <h1>Edit profile:</h1>
//                     <form action="" onSubmit={handleEdit}>
//                         <div>
//                            <label htmlFor="">Username:</label>
//                             <input name='username' type="text" defaultValue={profile.username} onChange={(e) => setUsername(e.target.value)}/>
//                         </div>
//                         <div>
//                            <label htmlFor="">First name:</label>
//                             <input name='firstName' type="text" defaultValue={profile.first_name} onChange={(e) => setFirstName(e.target.value)}/>
//                         </div>
//                         <div>
//                            <label htmlFor="">Last name:</label>
//                             <input name='lastName' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
//                         </div>
//                         <div>
//                            <label htmlFor="">Email:</label>
//                             <input name='email' type="email" defaultValue={profile.email} onChange={handleEditChange}/>
//                         </div>
//                         <div>
//                            <label htmlFor="">Your Bio:</label>
//                             <textarea name="bio" id="" cols="30" rows="10" defaultValue={bio} onChange={handleEditChange}></textarea>
//                         </div>
//                         <div>
//                            <label htmlFor="">Profile Picture:</label>
//                             <input name='profile picture' type="file" id="myFile" defaultValue={profilePic} onChange={handleEditChange}/>
//                         </div>
//                         <button>Edit and Save Changes</button>
//                     </form>
//
//                 </section>
//
//             }
//
//         </section>
//     );
// };
//
// export default EditProfile;