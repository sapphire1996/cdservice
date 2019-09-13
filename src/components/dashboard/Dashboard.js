import React, {Component} from 'react';
import Adverts from "./Adverts";
import ProjectList from '../projects/ProjectList';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import App from "../dashboard/Modal";
import moment from 'moment';
import firebase from 'firebase/app';
import {Link} from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import {storage} from '../../config/fbConfig'
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";

class Dashboard extends Component{

    render(){
        const {projects, auth, adverts, users} = this.props;
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        // a and b are javascript Date objects
       const  dateDiffInDays=(a, b) =>{
          // Discard the time and time-zone information.
          const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
          const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        
          return Math.floor((utc2 - utc1) / _MS_PER_DAY);
        };

        (function() {
            let elems = document.querySelectorAll('.fixed-action-btn');
            let instances = M.FloatingActionButton.init(elems, {direction: 'left'}); 
            
        })();


        (function() {
            let elems = document.querySelectorAll('.tooltipped');
            let instances = M.Tooltip.init(elems)
        })();

        (()=>{
            if(this.props.adverts && this.props.adverts.length > 0){
              this.props.adverts.filter(list =>dateDiffInDays(new Date(moment(list.approvalDate && list.approvalDate.toDate()).format()), new Date()) >= list.duration)
                .map(expiredAd=> {
                    const file = firebase.firestore().collection('adverts').doc(expiredAd.id)
                    file.get().then(doc=>{
                        //remove picture from storage
                        const url =storage.refFromURL(doc.data().picture)                    
                        storage.ref().child(url.location.path).delete();
                    }).then(()=>{
                        file.delete();
                    }).catch((err)=>{
                    console.log(err);
                })
            })
        }})();
        
        let user
        if(auth.uid && users){
           user =users && users.find(user=> user.id === auth.uid);
        } 

        if (!auth.uid) return <Redirect to='/signIn'/>

        return(
            <div className="dashboard container ">
                <App/>
                {user && !user.isAdmin?<Link to="/appGuidline"><i className="pink-text material-icons inline right tooltipped" data-position="left" data-tooltip="Need Help? Ask me!">contact_support</i></Link>:null}
                <div className="row">
                <div className="col-md-6 col-sm-12 panel z-depth-0" id="advert">
                {adverts?<Adverts  adverts={adverts}/>:<p>Loading adverts...</p>}
                </div>
                <hr/>
                <div  className="col-md-6 col-sm-12">
                {projects?<ProjectList  projects={projects} />:<p>Loading projects...</p>}
                </div>
                </div>
                <div className=" fixed-action-btn">
                <Link to="/post" className="btn-floating tooltipped btn-large pink add-btn" data-position="left" data-tooltip="Add CDS Project">
                <i className="material-icons">add</i> 
                </Link>
                </div>
                <ScrollUpButton style={{zIndex: '200000'}}/>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        projects: state.firestore.ordered.projects,
        adverts: state.firestore.ordered.adverts,
        auth: state.firebase.auth,
        notifications: state.firestore.ordered.notifications,
        users: state.firestore.ordered.users,

    }
}

export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        {collection: 'projects', orderBy: ['createdAt', 'desc']},
        {collection: 'adverts', 
        where: [
            ['approved', '==', true]
          ]
        },
        {collection: 'notifications', limit: 5, orderBy: ['time', 'desc']},
        {collection: 'users'},

    ])
)(Dashboard)