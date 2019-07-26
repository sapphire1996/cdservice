import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createProject } from "../../store/actions/projectAction";
import PreviewPicture from './PreviewPicture';
import {Redirect} from 'react-router-dom'

export class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      stateCode: '',
      picture: null,
      pictureUrl: null
    };
  }
   
  onTitleChange= (e) =>{
    this.setState({ title : e.target.value});
 }
 onContentChange =(e) =>{
    this.setState({ content : e.target.value});
 }
 onCodeChange=(e)=>{
  this.setState({ stateCode : e.target.value});

 }
 onPictureChange= (e) =>{
  let reader = new FileReader();
  let file = e.target.files[0];  
  reader.onloadend= ()=>{
      this.setState({
          picture: file,
          pictureUrl: reader.result
      });
  };
  reader.readAsDataURL(file)
 }
   
  handleSubmit=(e)=>{
    e.preventDefault();
    this.props.createProject(this.state)
    this.props.history.push('/');
}
    
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signIn'/>

    return (
      <div className="container">
        <form  onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Post New Project</h5>
            <div className="input-field">
                <label htmlFor='title'>Title</label>
                <input type='text' id="title" onChange={this.onTitleChange} required/>
            </div>
            <div className='input-field'>
                <label htmlFor='content'>Project Description</label>
                <textarea id="content" className="materialize-textarea" onChange={this.onContentChange} required></textarea>
            </div>
            <div >
                <label htmlFor='stateCode'>State Code</label>
                <input type='text' id="stateCode" placeholder="AK/18C/1158" onChange={this.onCodeChange} required/>
            </div>
            <div> 
            <p>Choose an image for your advert(not too big size)</p>
            <input
               type="file"
               className="form-control"
               onChange={this.onPictureChange}
            accept="image/gif, image/jpeg, image/png" 
               required/>
               </div>
               <hr />
                <b>Preview</b>
                <br />
                <div className="border advertFormPreview">
               <PreviewPicture pictureUrl={this.state.pictureUrl} height="200px"/>
               </div>
            <div >
            <button className="btn pink lighten-1 z-depth-0">Post</button>
            </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
      auth: state.firebase.auth
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    createProject: (data)=> dispatch(createProject(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
