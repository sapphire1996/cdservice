import React from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {signOut} from '../../store/actions/authAction'
import moment from 'moment';
import M from "materialize-css/dist/js/materialize.min.js";


const SignInLinks = (props) => {
    const {userUid, cdsRegLists, notifications, users} = props;
    let user
    if(userUid && users){
       user =users && users.find(user=> user.id === userUid);
      
    }

    // M.AutoInit();
    (function() {
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {alignment: 'right',hover: true, constrainWidth: false});
      })()

    const currentIds = cdsRegLists && cdsRegLists.map((users) =>{
    return users.id 
    }) 
    const done = currentIds && currentIds.find(userId=> {
       return userId === userUid;
      });


    return (
        <div>

            <ul className=" dropdown-content" id="dropdown1" data-constrainwidth="false">
            {notifications && notifications.map(item =>{
                return   <li key={item.id} className="border">
                                <small  className="pink-text">{item.user}: {item.content} </small>
                                <small className="grey-text note-date">
                                {moment(item.time.toDate()).fromNow()}
                                </small>
                            </li>
                        })}
            </ul>

            <ul id="nav-mobile" className = "right hide-on-med-and-down" >
                {userUid && user && user.isAdmin?
                 <li >
                 < NavLink to = "/reg" >Assign CDS</NavLink> 
                </li>:
                <li >
                    < NavLink to = "/post" > New Project </NavLink> 
                </li> }

                { userUid && user && user.isAdmin === false  | !done ?
                <li >
                < NavLink to = "/registration" > Register CDS</NavLink> 
                </li> :
                <li >
                < NavLink to = "/register" >View Registration Record</NavLink> 
                </li>}

               {userUid && user && user.isAdmin?
                <li >
                < NavLink to = "/guildline" >Project Guidline</NavLink> 
                </li> :null}

               {userUid && user && user.isAdmin === false?
                <li>
                <NavLink className="dropdown-trigger" to='#' data-target="dropdown1">Notifications<i className="pink-text material-icons right">notifications_active</i></NavLink>
                </li> :null}
                
                <li>
                    <NavLink to="#" className="btn-floating pink lighten-1 btn-large dropdown-trigger" data-target="profile">{props.profile.initials}</NavLink>
                </li> 

            </ul> 

            <ul className=" dropdown-content" id="dropdown2">
            {notifications && notifications.map(item =>{
                return   <li key={item.id} className="border">
                                <small  className="pink-text">{item.user}: {item.content} </small>
                                <small className="grey-text note-date">
                                {moment(item.time.toDate()).fromNow()}
                                </small>
                            </li>
                        })}
            </ul>

            <ul className=" dropdown-content" id="profile">
               {userUid && user && user.isAdmin === false? 
               <li className="border bold">
                      <NavLink to = {'/profile/'+userUid}>Profile</NavLink>          
                </li>:
                <li >
                < NavLink to = "/admin" >Admin Pannel</NavLink> 
                </li>
            }
                <li>
                    <button className="signout p-3" onClick={props.signOut}>Log Out</button>
                </li> 
            </ul>

            <ul className="sidenav" id="slide-out">
                {userUid && user && user.isAdmin?
                <li>
                    <NavLink to = "/admin" className="pink lighten-1 btn-large" > {props.profile.initials + " Pannel"}</NavLink>
                </li>:
                <li>
                <NavLink to = {'/profile/'+userUid} className="pink lighten-1 btn-large" > {props.profile.initials + " Profile"}</NavLink>
                </li>
                }
                {userUid && user && user.isAdmin === false?
                <li >
                < NavLink to = "/post" > New Project </NavLink> 
            </li>
                 :
                <li >
                < NavLink to = "/reg" >Assign CDS</NavLink> 
            </li> }
                { userUid && user && user.isAdmin === false  | !done ?
                <li >
                < NavLink to = "/registration" > Register CDS</NavLink> 
                </li> :
                <li >
                < NavLink to = "/register" >View Registration Record</NavLink> 
                </li> 
                }
               {userUid && user && user.isAdmin?
                <li >
                < NavLink to = "/guildline" >Project Guidline</NavLink> 
                </li> :null
               }
                <li>
                    <NavLink to="#"><button className="signout mr-3" onClick={props.signOut}>Log Out</button></NavLink>
                </li> 
                <li>
                    <NavLink className="dropdown-trigger" to="#" data-target="dropdown2">Notifications<i className="pink-text material-icons right">notifications_active</i></NavLink>
                </li>
            </ul>
      </div>
    )
}
const mapStateToProps=(state)=>{
    return{
        cdsRegLists: state.firestore.ordered.cdsRegLists,
        userUid: state.firebase.auth.uid,
        notifications: state.firestore.ordered.notifications,
        users: state.firestore.ordered.users,
        projects: state.firestore.ordered.projects
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
        {collection: 'cdsRegLists'},
        {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']},
        {collection: 'users'},
        {collection: 'projects'}

    ])
)(SignInLinks)
