import React from 'react';
import {NavLink} from 'react-router-dom';

const SignOutLinks = () => {
    return (
<div>
        <ul className = "right" >
        <li >
        < NavLink to = "/signin" >LogIn </NavLink>
        </li> 
        <li>
        < NavLink to = "/signup" >SignUp</NavLink>
        </li> 
        </ul> 
        <ul className="sidenav" id="mobile-demo">
        <li >
        < NavLink to = "/signin" >LogIn </NavLink>
        </li> 
        <li>
        < NavLink to = "/signup" >SignUp</NavLink>
        </li> 
        
       </ul>
      </div>
    )
}

export default SignOutLinks;