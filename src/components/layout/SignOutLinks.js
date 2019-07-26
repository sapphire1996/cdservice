import React from 'react';
import {NavLink} from 'react-router-dom';

const SignOutLinks = () => {
    return (

        <ul className = "right" >
        <li >
        < NavLink to = "/signin" >LogIn </NavLink>
        </li> 
        <li>
        < NavLink to = "/signup" >SignUp</NavLink>
        </li> 
        
        </ul> 

    )
}

export default SignOutLinks;