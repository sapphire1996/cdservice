import React from 'react';
import {Link} from 'react-router-dom';
import SignInLinks from './SignInLinks';
import SignOutLinks from './SignOutLinks';
import {connect} from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";



const Navbar = (props) =>{
  (function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);  })();
    
    const {auth, profile} = props;
    const links = auth.uid ? <SignInLinks profile={profile}/> : <SignOutLinks/>;
    return(
        <div>
        <nav className="nav-extended">
        <div className=" container nav-wrapper">
        <Link to="/" className="brand-logo">IBOM KOPA CDS</Link>
        <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>
        {links}
        </div>
        </nav>
         
       </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);