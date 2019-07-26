import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {signOut} from '../../store/actions/authAction'

const SignInLinks = (props) => {
    const {userUid, cdsRegLists} = props;
//    console.log(props.profile)

    
    const currentIds = cdsRegLists && cdsRegLists.map((users) =>{
    return users.id 
    }) 
    const done = currentIds && currentIds.find(userId=> {
       return userId === userUid;
      });

    return (
        <div>
        <ul id="nav-mobile" className = "right hide-on-med-and-down" >
            <li >
                < NavLink to = "/post" > New Project </NavLink> 
            </li> 
            {!done?
            <li >
            < NavLink to = "/registration" > Register CDS</NavLink> 
                </li> :null 
            }
        
            <li>
                <button className="signout" onClick={props.signOut}>Log Out</button>
            </li> 
            <li >
                < NavLink to = "/admin" >admin </NavLink> 
            </li> 
            <li>
                <NavLink to = {'/profile/'+userUid} className="btn-floating pink lighten-1 btn-large" >{props.profile.initials}</NavLink>
            </li> 
        </ul> 
        <ul className="sidenav" id="mobile-demo">
            <li >
                < NavLink to = "/post" > New Project </NavLink> 
            </li> 
            {!done?
            <li >
            < NavLink to = "/registration" > Register CDS</NavLink> 
                </li> :null 
            }
            <li>
                <NavLink to = {'/profile/'+userUid} className="pink lighten-1 btn-large" > {props.profile.initials + " Profile"}</NavLink>
            </li>
            <li >
                < NavLink to = "/admin" >admin </NavLink> 
            </li>
            <li>
                <NavLink to="#"><button className="signout mr-3" onClick={props.signOut}>Log Out</button></NavLink>
            </li> 
        
       </ul>
      </div>
    )
}
const mapStateToProps=(state)=>{
    // console.log(state);
    return{
        cdsRegLists: state.firestore.ordered.cdsRegLists,
        userUid: state.firebase.auth.uid
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
    signOut: ()=> dispatch(signOut())
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {collection: 'cdsRegLists'}
    ])
)(SignInLinks)
