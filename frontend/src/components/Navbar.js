import {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import SearchBook from "./SearchBook";
import getAccessToken from "../utils/getToken";
import axios from "axios";
import {URL} from "../utils/url";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  console.log(user)
    const [books, setBooks] = useState([])
    const [nav, setNav] = useState(false);

  const handleClick = () => {
    setNav(!nav);
  };

    useEffect(() => {
        const fetchData = async () => {
            let token = getAccessToken();
            let result = await axios.get(`${URL}api_books/books/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer  ${token}`
                }
            });
            if (result.status === 200) {
                const books = result.data
                console.log(books)
                setBooks(books)
            }
        }
        fetchData()
            .catch(console.error)
    }, [])
  return (
      <div className="mb-[100px]">
      <div className="w-[100%] h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg border-4 border-indigo-200">
          <div className="px-2 flex justify-between items-center w-full h-full">
              <div className="flex items-center">
                  <h1 className="text-3xl font-bold mr-4 sm:text-4xl">Reading Tracker</h1>
                  <>
          {user ?
              <div>
                  <ul className='hidden md:flex'>
           <SearchBook books={books}/>

           <li><Link to="/">Home</Link></li>
                  <li><Link to="/books">Books</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to={`/your_profile/${user.user_id}`}>Profile</Link></li>

          <button className="px-8 py-3" onClick={logoutUser}>Logout</button>
            </ul>
                <div>
                    <button className="md:hidden" onClick={handleClick}>
                        {!nav ? 'Open' : 'X'}
                    </button>
                </div>

              </div>


          :
        <div>
            <ul className="hidden md:flex">
          <li>
          <Link to="/login">Login</Link>
           </li>
          <li>
          <Link to="/register">Register</Link>
           </li>
          </ul>

        <div>
            <button className="md:hidden" onClick={handleClick}>
                {!nav ? 'Open' : 'X'}
            </button>
        </div>
        </div>



          }
      </>
              </div>

          </div>
        {
                          user ?
                              <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
                                  <SearchBook books={books}/>

                                  <li className="border-b-2 border-zinc-300 w-full"><Link to="/">Home</Link></li>
                                  <li className="border-b-2 border-zinc-300 w-full"><Link to="/books">Books</Link></li>
                                  <li className="border-b-2 border-zinc-300 w-full"><Link to="/users">Users</Link></li>
                                  <li className="border-b-2 border-zinc-300 w-full"><Link
                                      to={`/your_profile/${user.user_id}`}>Profile</Link></li>

                                <button className="px-8 py-3" onClick={logoutUser}>Logout</button>
                              </ul>
                              :
                              <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
                                <li className="border-b-2 border-zinc-300 w-full">
          <Link to="/login">Login</Link>
           </li>
          <li className="border-b-2 border-zinc-300 w-full">
          <Link to="/register">Register</Link>
           </li>
                              </ul>


                      }
      </div>
        </div>
  )
    // <nav className='flex-no-wrap relative flex w-full items-center justify-between bg-neutral-100 py-4 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start'>
    //   <div className='flex w-full flex-wrap items-center justify-between px-6'>
    //       <button
    //           className="block border-0 bg-transparent py-2 px-2.5 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
    //           type="button"
    //           data-te-collapse-init
    //           data-te-target="#navbarSupportedContent1"
    //           aria-controls="navbarSupportedContent1"
    //           aria-expanded="false"
    //           aria-label="Toggle navigation">
    //   <span className="[&>svg]:w-7">
    //     <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         viewBox="0 0 24 24"
    //         fill="currentColor"
    //         className="h-7 w-7">
    //       <path
    //           fill-rule="evenodd"
    //           d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
    //           clip-rule="evenodd"/>
    //     </svg>
    //   </span>
    //       </button>
    //       <div className='!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto'>
    //           <h1>Reading Tracker</h1>
    //             {user ? (
    //         <ul className='list-style-none mr-auto flex flex-col pl-0 lg:flex-row'>
    //             <SearchBook books={books}/>
    //             <li className='lg:pr-2'>
    //                <Link to="/" className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'>Home</Link>
    //             </li>
    //             <li className='lg:pr-2'>
    //                 <Link to="/books" className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'>Books</Link>
    //             </li>
    //             <li className='lg:pr-2'>
    //                 <Link to="/users" className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'>Users</Link>
    //             </li>
    //             <li className='lg:pr-2'>
    //                 <Link to={`/your_profile/${user.user_id}`} className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'>Profile</Link>
    //             </li>
    //           <button onClick={logoutUser}>Logout</button>
    //         </ul>
    //       ) : (
    //
    //             <ul className='list-style-none mr-auto flex flex-col pl-0 lg:flex-row'>
    //                 <li className='lg:pr-2'>
    //                    <Link to="/login" className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'>Login</Link>
    //                 </li>
    //                 <li>
    //                     <Link to="/register" className='text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400'>Register</Link>
    //                 </li>
    //             </ul>
    //       )}
    //
    //       </div>



          {/*{user ? (*/}
          {/*  <>*/}
          {/*      <SearchBook books={books}/>*/}
          {/*    <Link to="/">Home</Link>*/}
          {/*    /!*<Link to="/protected">Protected Page</Link>*!/*/}
          {/*      <Link to="/books">Books</Link>*/}
          {/*      <Link to="/users">Users</Link>*/}
          {/*      <Link to={`/your_profile/${user.user_id}`}>Profile</Link>*/}
          {/*    <button onClick={logoutUser}>Logout</button>*/}
          {/*  </>*/}
          {/*) : (*/}
          {/*  <nav className='container mx-auto border-2'>*/}
          {/*      <ul>*/}
          {/*          <li>*/}
          {/*             <Link to="/login">Login</Link>*/}
          {/*          </li>*/}
          {/*          <li>*/}
          {/*              <Link to="/register">Register</Link>*/}
          {/*          </li>*/}
          {/*      </ul>*/}
          {/*  </nav>*/}
          {/*)}*/}
    //     </div>
    //   {/*</div>*/}
    // </nav>

};

export default Navbar;

