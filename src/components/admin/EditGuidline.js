import React, {Component} from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {updateGuidline} from '../../store/actions/adminAction';
import ProjectGuidline from '../admin/ProjectGuidline'

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
        const { guildline} = this.props;  
        console.log(guildline);
        return(
        <div className="container text-center">
        <div><h4 className="pink-text">Instruction!!</h4><h5>To Edit the guildline, 
            copy the pevious content and paste to the editor, 
            then make changes. OR, don't bother copying, start writing a new one.</h5></div>
            <div className="row mt-3">
                <div className="col s12 m6">
                    <textarea className="guild" value={this.state.content} id="content" onChange={this.handleChange}/>
                    <button onClick={this.handleUpdate}>Update</button>
                </div>
                <div className="col s12 m5 offset-m1">
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
        guildline: state.firestore.ordered.projectGuidline
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        projectGuidline: (guildline) =>dispatch(updateGuidline(guildline))  }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
        {collection: 'projectGuidline'}
    ])
)(EditGuidline)
