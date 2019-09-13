import React, {Component} from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import 'firebase/firestore';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import Accordion from 'react-collapsy';
import AdvertForm from './AdvertForm';
import {Link} from 'react-router-dom';
import ProjectSummary from '../projects/ProjectSummary';
import { deleteProject } from "../../store/actions/projectAction";
import {addToken} from "../../store/actions/pushNotificationAction"
import App from "../dashboard/Modal";
import firebase from 'firebase/app';
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";


class Profile extends Component{

  handleDeleleProject=(e)=>{
    let id=e.target.id;
    this.props.deleteProject(id);
  };
 
   handleTokenRefresh=() =>{
    return firebase.messaging().getToken().then((token) => {
      this.props.addToken(token);
    });
  }

   subscribeToNotifications=()=> {
    firebase.messaging().requestPermission()
      .then(() => this.handleTokenRefresh())
      .then(()=>console.log('subscribed'))
      .catch((err) => {
        console.log("error getting permission :(",err);
      });
  }

   unsubscribeFromNotifications=()=> {
    firebase.messaging().getToken()
      .then((token) => firebase.messaging().deleteToken(token))
      .then(() => firebase.firestore().collection("tokens")
      .where("userId", "==", this.props.auth.uid).get())
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
          doc.ref.delete().then(() => {
            console.log('unsubscribed');
          })
        });
      })
      .catch((error)=> {
        console.error("Error removing document: ", error);
      })
  }

    render(){
      firebase.messaging().onTokenRefresh(this.handleTokenRefresh);
        const {profileInfo, auth, project, tokens} = this.props;

        // Start of Tawk.to Script
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5d7ae55bc22bdd393bb59a54/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        // End of Tawk.to Script

        let foundToken =tokens && tokens.find(token=>token.userId===auth.uid)

        if (!auth.uid) return <Redirect to='/signIn'/>
        return(

            <div className="container">
                <App/>
                <div className="right inline mb-2">
                  {foundToken?<button  className="btn btn-lg unsubscribe" onClick={this.unsubscribeFromNotifications} >
                    Unsubscribe From Notification
                    <i className="pink-text material-icons right">notifications_active</i>
                  </button>:
                  <button className="btn btn-lg subscribe" onClick={this.subscribeToNotifications} >
                  Subscribe To Notification
                  <i className="pink-text material-icons right">notifications_active</i>                    
                  </button>}
                </div>
                <div className="col-md-12 col-sm-12  ">
                    <Accordion title='advertize here'>
                    <AdvertForm/>
                    </Accordion>
                  </div>
                  <div className="row">
                    <div className="col-md-6 col-sm-12  panel">
                    <h3 className="detail head mt-5 text-center"><strong>CDS Profile Data</strong></h3>
                    {profileInfo && profileInfo.length === 1 ? profileInfo && profileInfo.map((info)=>{
                        return  <ul key={info.id} className="">
                                    <li ><p>Name: <span>{info.fullName}</span></p></li>
                                    <li ><p>State Code: <span>{info.codeNumber}</span></p></li>
                                    <li ><p>Course: <span>{info.course}</span></p></li>
                                    <li ><p>Local Government: <span>{info.localGovt}</span></p></li>
                                    <li ><p>PPA: <span>{info.ppa}</span></p></li>
                                    <li ><p>CDS: <span>{info.cds?info.cds:'You Have Not been assigned a CDS Yet'}</span></p></li>
                                </ul>
                        }):<span>Your Data will show up here when your register for CDS</span>
                    }
                    </div>
                    <div className="col-md-6 col-sm-12">
                    {project?<h3 className="text-center mt-5 detail head ">Personal CDS Projects</h3>:null}
                    <ul className="project-list section">
                      {project && project.map(prjt=>{
                          return(
                            <li key={prjt.id}>
                              <Link key={prjt.id} to={'/project/' + prjt.id}>
                              <ProjectSummary project={prjt} key={prjt.id}/>
                              </Link>
                              <button id={prjt.id} className="btn pink lighten-1 z-depth-0" onClick={this.handleDeleleProject}>Delete this project</button>
                              <Link to = "/post" className="btn pink lighten-1 z-depth-0">Post Another Project</Link> 
                            </li>
                          )
                      })}
                    </ul>
                    </div>
                </div>
                <ScrollUpButton style={{zIndex: '200000'}}/>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        profileInfo: state.firestore.ordered.cdsRegLists,
        auth: state.firebase.auth,
        project: state.firestore.ordered.projects,
        tokens: state.firestore.ordered.tokens
    }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    deleteProject: (id)=> dispatch(deleteProject(id)),
    addToken: (token)=> dispatch(addToken(token))
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((ownProps) => {        
      if (!ownProps.match.params.id) return []
      return [
        {
          collection: 'cdsRegLists',
          where: [
            ['identity', '==', ownProps.match.params.id]
          ]
        },
        {collection: 'projects',
         where: [
          ['authorId', '==', ownProps.match.params.id]
        ]},
        {collection: 'tokens'}
      ]
    }
    )
  )(Profile);