import React, {Component} from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import Accordion from 'react-collapsy';
import AdvertForm from './AdvertForm';
import App from "../dashboard/Modal";


class Profile extends Component{
    render(){
        const {profileInfo, auth} = this.props;
        
        if (!auth.uid) return <Redirect to='/signIn'/>
        return(
            <div className="dashboard container">
            <App/>
                <div className="row">
                <Accordion title='advertize here'>
                    <AdvertForm/>
                    </Accordion>
                    <div className="col s12 m6">
                    <h5>CDS Profile Data:</h5>
                    {profileInfo? profileInfo.map((info)=>{
                        return  <ul key={info.id}>
                                    <li  className="contain"><p>Name: <span>{info.fullName}</span></p></li>
                                    <li  className="contain"><p>State Code: <span>{info.stateCode+info.codeNumber}</span></p></li>
                                    <li  className="contain"><p>Course: <span>{info.course}</span></p></li>
                                    <li  className="contain"><p>Local Government: <span>{info.localGovt}</span></p></li>
                                    <li  className="contain"><p>PPA: <span>{info.ppa}</span></p></li>
                                    <li  className="contain"><p>CDS: <span>{info.cds?info.cds:'You Have Not been assigned a CDS Yet'}</span></p></li>
                                </ul>
                        }):<p>Your Data will show up here when your register for CDS</p>
                    }
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
        }
      ]
    }
    )
  )(Profile);