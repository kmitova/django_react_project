import {Link} from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <div>
      <h4>Footer element</h4>
        <p>links to other pages (about, careers, teams, privacy, etc)</p>
        <ul className='border-2 border-zinc-400 w-[200px]'>
            <li className='text-center'><Link to={`/about`}>About us</Link></li>
            <li className='text-center'><Link to={`/privacy`}>Privacy</Link></li>

        </ul>
    </div>
  );
};

export default Footer;