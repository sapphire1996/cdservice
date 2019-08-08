import React from 'react';
import {NavLink} from 'react-router-dom';

const SignOutLinks = () => {
    

    return (
    <div>      
        <ul className = "right hide-on-med-and-down" >
        <li >
        < NavLink to = "/signin" >LogIn </NavLink>
        </li> 
        <li>
        < NavLink to = "/signup" >SignUp</NavLink>
        </li> 
        </ul> 

        <ul id="slide-out" className="sidenav" >
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