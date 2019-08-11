import React, {Component} from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import Accordion from 'react-collapsy';
import AdvertForm from './AdvertForm';
import {Link} from 'react-router-dom';
import ProjectSummary from '../projects/ProjectSummary';
import { deleteProject } from "../../store/actions/projectAction";
import App from "../dashboard/Modal";


class Profile extends Component{
  handleDeleleProject=(e)=>{
    let id=e.target.id;
    this.props.deleteProject(id);
  }

    render(){
        const {profileInfo, auth, project} = this.props;

        //Start of Tawk.to Script
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/5d508a9deb1a6b0be60707de/default';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        // End of Tawk.to Script

        if (!auth.uid) return <Redirect to='/signIn'/>
        return(
            <div className="dashboard container">
            <App/>
                <div className="row">
                    <Accordion title='advertize here'>
                    <AdvertForm/>
                    </Accordion>
                    <div className="col-md-6 col-sm-12 card-panel">
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
                    <div className="col-md-6 col-sm-12">
                    {project?<h3><strong>Your Personal CDS Project</strong></h3>:null}
                    <ul className="project-list section">
                      {project && project.map(prjt=>{
                          return(
                            <li key={prjt.id}>
                              <Link key={prjt.id} to={'/project/' + prjt.id}>
                              <ProjectSummary project={prjt} key={prjt.id}/>
                              </Link>
                              <button id={prjt.id} className="btn pink lighten-1 z-depth-0" onClick={this.handleDeleleProject}>Delete this project</button>
                            </li>
                          )
                      })}
                    </ul>
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

const mapDispatchToProps=(dispatch)=>{
  return{
    deleteProject: (id)=> dispatch(deleteProject(id))
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

      ]
    }
    )
  )(Profile);