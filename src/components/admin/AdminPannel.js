import React, {Component} from 'react';
import Editable from "./Editable";
import Adverts from "./Advert";
import Notifications from "./Notification";
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import SendNotification from './SendNotification';
import 'react-collapsy/lib/index.css';
import AdminSignUp from '../auth/AdminSignUp';
import Accordion from 'react-collapsy';
import AdvertIncome from './AdvertIncome';
import {Link} from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";


class AdminPanel extends Component{

    render(){
        const { notifications, auth, users} = this.props;  
        let user
        if(auth.uid && users){
           user =users && users.find(user=> user.id === auth.uid);
        }  
        if (!auth.uid) return <Redirect to='/signIn'/>

        if(auth.uid && user && !user.isAdmin) return <Redirect to='/'/>
        
        (function(){
            let elems = document.querySelectorAll('.fixed-action-btn');
            let instances = M.FloatingActionButton.init(elems, {direction: 'left'}); 
        })();

        (function(){
            let elems = document.querySelectorAll('.tooltipped');
            let instances = M.Tooltip.init(elems)
        })();

           return(
            <div className="m-5 p-3 row">
                <div className="col-md-6 col-sm-12 ">
                <Notifications notifications={notifications}/>
                <AdvertIncome/>
                <Adverts />
                </div>
                <div className="col-md-6 col-sm-12 ">
                <SendNotification/>
                <Editable/>
                <Accordion title="Add admin">
                <AdminSignUp/>
                </Accordion>
                </div>
                <div className="fixed-action-btn">
                <Link to="/adminGuidline" className="btn-floating btn-large tooltipped btn-large pink " data-position="left" data-tooltip="Neld Help to do something?">
                <i className="material-icons">contact_support</i> 
                </Link>
                </div>                
                <ScrollUpButton style={{zIndex: '200000'}}/>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        users: state.firestore.ordered.users,
    }
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']},
        {collection: 'users'},
    ])
)(AdminPanel)
