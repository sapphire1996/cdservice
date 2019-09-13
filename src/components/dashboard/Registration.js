import React, {Component} from 'react';
import Form from '../admin/Form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
class Registration extends Component{

    viewRecords=()=>{
        this.props.history.push('/register');
    }
    editGuidline=()=>{
        this.props.history.push('/guildline');
    }
    render(){
        const {auth, cdsRegLists} = this.props;    
        if (!auth.uid) return <Redirect to='/signIn'/>
        //if user already reg cds
    const currentIds = cdsRegLists && cdsRegLists.map((users) =>{
        return users.id 
        }) 
        const done = currentIds && currentIds.find(userId=> {
           return userId === auth.uid;
          });
          if(done)return <Redirect to={'/profile/'+auth.uid}/>
           return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col s12 m6">
                    <Form/>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        cdsRegLists: state.firestore.ordered.cdsRegLists,
    }
}
export default compose(
    connect(mapStateToProps), 
    firestoreConnect([
        {collection: 'cdsRegLists'},
    ])
)(Registration)
