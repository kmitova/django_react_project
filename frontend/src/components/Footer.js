import {Link} from "react-router-dom";
import React from "react";

const Footer = () => {
  return (
    <div>
        <ul className='border-2 border-zinc-400 w-[200px]'>
            <li className='text-center'><Link to={`/about`}>About us</Link></li>
            <li className='text-center'><Link to={`/privacy`}>Privacy</Link></li>
            <li className='text-center'><Link to={`/teams`}>Teams</Link></li>
            <li className='text-center'><Link to={`/careers`}>Careers</Link></li>
            <li className='text-center'><Link to={`/help`}>Help</Link></li>

        </ul>
    </div>
  );
};

export default Footer;