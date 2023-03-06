import {useContext, useEffect, useState} from "react";
import UserInfo from "../components/UserInfo";
import AuthContext from "../context/AuthContext";
import {Navigate} from "react-router-dom";
import axios from "axios";

const Home = () => {
  const {user} = useContext(AuthContext);
  const [categories, setCategories] = useState([])




  function getAccessToken() {
        let result = window.localStorage.getItem('authTokens');
        if (!result) {
            return "";
        }
        return JSON.parse(result).access;
    }

  // async function fetchData() {
  //   // let _headers = {
  //   //   headers: {
  //   //     'Accept': 'application/json',
  //   //     'Content-Type': 'application/json'
  //   //   }
  //   // };
  //   let token = getAccessToken();

    // console.log(token)
    // if (token) {
    //   _headers.headers['Authorization'] = "Bearer" + token;
    // }

  //   let result = await axios.get(`${url}api_books/categories/`,{
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer  ${token}`
  //     }
  //   });
  //   console.log(result)
  //   if (result.status === 200) {
  //     const allCategories = result.data
  //     setCategories(allCategories)
  //     console.log(result.data)
  //     return result;
  //   }
  //
  // }
  // const token = window.localStorage.getItem("token");
  // console.log(token)
  // async function fetchData() {
  //   // try {
  //     const response = await axios.get(`${url}api-books/categories`, {
  //     headers: {
  //       Authorization: `bearer ${localStorage.getItem(JSON.parse(token).accessToken)}`,
  //
  //     }
  //   }).then((response) => {
  //     const allCategories = response.data.categories.allCategories
  //     setCategories(allCategories)
  //   })
  //       .catch(error => console.log(`error: ${error}`))
    // } catch {
    //
    // }
    // axios.get(`${url}api-books/categories`, {
    //   headers: {
    //     Authorization: `bearer ${localStorage.getItem(response.data.token)}`,
    //
    //   }
    // }).then((response) => {
    //   const allCategories = response.data.categories.allCategories
    //   setCategories(allCategories)
    // })
    //     .catch(error => console.log(`errorL ${error}`))
  // }
    if (!user) {
        return <Navigate replace to='/login' />
    } else {
       return (



    <section>
      {user && <UserInfo user={user} />}
      <h1>You are on home page!</h1>
        <h2>Hello, {user.email}!</h2>
    </section>
  );
    }

};

export default Home;