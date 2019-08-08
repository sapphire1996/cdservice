import React, { Component } from 'react';
// import CdsList from "./CdsList";
import {connect} from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addLocalGovt, deleteLocalGovt} from "../../store/actions/adminAction";
import {Link } from 'react-router-dom';


class LocalGovt extends Component{
  state={
    localGovt: ''
}
handleChange=(e)=>{
    this.setState({
        [e.target.id]: e.target.value
    } )
}
handleSubmit=(e)=>{
    e.preventDefault();
    this.props.addLocalGovt(this.state)
}
handleDeleteLg=(e)=>{
  e.preventDefault();
  let id=e.target.id;
  this.props.deleteLocalGovt(id)
}
render(){
const {localGovtList}= this.props
  return (
    <div className="card">
    <form onSubmit={this.handleSubmit}>
      <div className="row">
        <input placeholder="Add local Govt" className="col mr-2" id="localGovt" onChange={this.handleChange}/>
        <button href="" className="btn-small btn-outline-primary waves-effect col-2">Add</button>
    </div>
    </form>
    <div>
     <ul>
      {localGovtList && localGovtList.map(lglist =>{
        return(
        <li key={lglist.id} >
        <Link to={'/cds/' + lglist.id}>
          <div className="contain chip">
            <button className="cds col l10 m8 s8" id={lglist.id} >{lglist.localGovt}</button>
            <i id={lglist.id} onClick={this.handleDeleteLg}  className="close fas fa-times col l2 m4 s4">delete</i>
          </div>
        </Link>
        </li>
        )
      })}
    </ul>
    </div>
    </div>
  )
}
}
const mapStateToProps=(state)=>{
  return{
    localGovtList: state.firestore.ordered.localGovtList,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    addLocalGovt: (localgovt)=> dispatch(addLocalGovt(localgovt)),
    deleteLocalGovt: (id)=> dispatch(deleteLocalGovt(id))
  }
}
export default compose(
connect(mapStateToProps, mapDispatchToProps),
firestoreConnect([
  {collection: 'localGovtList'},
])
)(LocalGovt)


