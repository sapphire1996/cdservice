import React, { Component } from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import moment from 'moment'
import PreviewPicture from './PreviewPicture';
import { addLike, removeLike } from "../../store/actions/projectAction";

class ProjectDetail extends Component{
  constructor(props) {
    super(props);
    this.state = {
      clicked: null
    };
  }
   increment=(e)=>{
     e.preventDefault() 
     let id = e.target.id;    
    this.props.addLike(this.props.match.params.id);
    localStorage.setItem(id, true)
    this.setState({
      clicked: localStorage.getItem(id)
    })    
    console.log(this.state.clicked);

  }
   decrement=(e)=>{
    e.preventDefault()
    let id = e.target.id;
    this.props.removeLike(this.props.match.params.id);
    localStorage.setItem(id, false)
    this.setState({
      clicked:localStorage.getItem(id)
    })
    console.log(this.state.clicked);

  }
render(){
  const {project, auth, id}= this.props;
  if (!auth.uid) return <Redirect to='/signIn'/>
  
  if (project) {
    return(
    <div className="container">
      <div className="card z-depth-0">
        <div className="card-content">
          <div className="card-title advertizer">{project.title}</div>
          <div className="border">
          {project.picture?<PreviewPicture pictureUrl={project.picture}  height="auto" />:null}
          </div>
            <div className="card-action grey lighten-4 grey-text">
            <h5 className="black-text detail">{project.content}</h5>
              <div><strong>Posted By {project.authorFullName} {project.stateCode}</strong></div>
              <div>{moment(project.createdAt.toDate()).calendar()}</div>
              <h5>{project.likeCount>1?project.likeCount + " likes":project.likeCount + " like"}</h5>
              {this.state.clicked?
              <i className="material-icons waves-effect btn-flat " id={id} onClick={this.decrement}>thumb_down</i>:
              <i className="material-icons waves-effect btn-flat pink-text" id={id}  onClick={this.increment}>thumb_up</i>}
            </div>
        </div>
      </div>
    </div>
    )
  }else{
 return (
    <div className="container center">
    <p>Loading Projects...</p>
    </div>
  )
  }
}
}
const mapStateToProps=(state, ownProps)=>{
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id]: null;
  return{
      project: project,
      auth: state.firebase.auth
   }
}
const mapDispatchToProps=(dispatch)=>{
  return{
      addLike: (id) =>dispatch(addLike(id)), 
      removeLike: (id) =>dispatch(removeLike(id))
    }
}
export default compose(
  connect(mapStateToProps,mapDispatchToProps),
firestoreConnect([
  {collection: 'projects'}
])
)(ProjectDetail);
