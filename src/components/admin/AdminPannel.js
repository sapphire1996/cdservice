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

class AdminPanel extends Component{

    render(){
        const { notifications, auth} = this.props;    
        if (!auth.uid) return <Redirect to='/signIn'/>
 
           return(
            <div className=" m-5 row">
            <div className="col s12 m6 l6">
            <Notifications notifications={notifications}/>
            <AdvertIncome/>
            <Adverts />
            </div>
            <div className="col s12 m6 l6">
            <div className="mt-5 mb-2">
            </div>
            <SendNotification/>
            <Editable/>
            <Accordion title="Add admin">
            <AdminSignUp/>
            </Accordion>
            </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
    }
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']},
    ])
)(AdminPanel)
