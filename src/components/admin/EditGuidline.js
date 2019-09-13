import React, {Component} from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {updateGuidline} from '../../store/actions/adminAction';
import ProjectGuidline from '../admin/ProjectGuidline'
import {Redirect} from 'react-router-dom';

class EditGuidline extends Component{
state={
    content: ''
}
handleChange=(e)=>{
    this.setState({
        [e.target.id]: e.target.value
    } )
}
handleUpdate=(e)=>{
e.preventDefault();
this.props.projectGuidline(this.state)
this.setState({ content: ''})
}   
    render(){
        const { guildline, auth, users} = this.props; 
        let user
        if(auth.uid && users){
           user =users && users.find(user=> user.id === auth.uid);
        }  
        if (!auth.uid) return <Redirect to='/signIn'/>
        if(auth.uid && user && !user.isAdmin) return <Redirect to='/'/>

        return(
        <div className="container text-center">
        <div><h4 className="pink-text">Instruction!!</h4><h5>To Edit the guildline, 
            copy the pevious content and paste to the editor, 
            then make changes. OR, start writing a new one.</h5></div>
            <div className="row mt-3">
                <div className="col-md-6 col-sm-12">
                    <textarea className="guild" value={this.state.content} id="content" onChange={this.handleChange}/>
                    <button onClick={this.handleUpdate}>Update</button>
                </div>
                <div className="col-md-6 col-sm-12 card-panel">
                    <ProjectGuidline cdsProjectGuide={guildline}/>
                </div>
            </div>
        </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
        guildline: state.firestore.ordered.projectGuidline,
        users: state.firestore.ordered.users,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        projectGuidline: (guildline) =>dispatch(updateGuidline(guildline))  }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {collection: 'projectGuidline'},
        {collection: 'users'},
    ])
)(EditGuidline)
