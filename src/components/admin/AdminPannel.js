import React, {Component} from 'react';
import Editable from "./Editable";
import Adverts from "./Advert";
import Notifications from "./Notification";
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import SendNotification from './SendNotification';
import {Link } from 'react-router-dom';
import 'react-collapsy/lib/index.css';

class AdminPanel extends Component{

    render(){
        const { notifications, auth} = this.props;    
        if (!auth.uid) return <Redirect to='/signIn'/>
 
           return(
            <div className="container mt-5 row">
            <div className="col s12 m6 offset-m1">
            <Notifications notifications={notifications}/>
            <Adverts />
            </div>
            <div className="col s12 m6">
            <div className="m-2">
            <Link to="/reg" className="pink lighten-1 btn-small waves-effect m-1">Assign CDS</Link>
            <Link to="/register" className="pink lighten-1 btn-small waves-effect ">View Registration Record</Link>
            <Link to="/guildline" className="pink lighten-1 btn-small waves-effect m-1">Project Guidline</Link>
            </div>
            <SendNotification/>
            <Editable/>
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
