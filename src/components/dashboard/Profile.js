import React, {Component} from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import Accordion from 'react-collapsy';
import AdvertForm from './AdvertForm';
import App from "../dashboard/Modal";
import ProjectList from '../projects/ProjectList';
import Footer from '../layout/Footer';


class Profile extends Component{
    render(){
        const {profileInfo, auth, project} = this.props;
      
        if (!auth.uid) return <Redirect to='/signIn'/>
        return(
            <div className="dashboard container">
            <App/>
                <div className="row">
                    <Accordion title='advertize here'>
                    <AdvertForm/>
                    </Accordion>
                    <div className="col s12 m6">
                    <h3><strong>CDS Profile Data:</strong></h3>
                    {profileInfo && profileInfo === 1 ? profileInfo && profileInfo.map((info)=>{
                        return  <ul key={info.id} className="card">
                                    <li ><p>Name: <span>{info.fullName}</span></p></li>
                                    <li ><p>State Code: <span>{info.stateCode+info.codeNumber}</span></p></li>
                                    <li ><p>Course: <span>{info.course}</span></p></li>
                                    <li ><p>Local Government: <span>{info.localGovt}</span></p></li>
                                    <li ><p>PPA: <span>{info.ppa}</span></p></li>
                                    <li ><p>CDS: <span>{info.cds?info.cds:'You Have Not been assigned a CDS Yet'}</span></p></li>
                                </ul>
                        }):<span>Your Data will show up here when your register for CDS</span>
                    }
                    </div>
                    <div className="col s12 m6">
                    {project?<h3><strong>Your Personal CDS Project</strong></h3>:null}
                    <ProjectList projects={project}/>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        profileInfo: state.firestore.ordered.cdsRegLists,
        auth: state.firebase.auth,
        project: state.firestore.ordered.projects
    }
}

export default compose(
    connect(mapStateToProps),
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

      ]
    }
    )
  )(Profile);