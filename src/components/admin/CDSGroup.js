import React, { Component } from 'react';
// import CdsList from "./CdsList";
import {connect} from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addCdsGroup, deleteCdsGroup } from "../../store/actions/adminAction";
import {Link } from 'react-router-dom';

class CDSGroup extends Component{
  state={
    cdsGroup: ''
}
handleChange=(e)=>{
    this.setState({
        [e.target.id]: e.target.value
    } )
}
handleSubmit=(e)=>{
    e.preventDefault();
    this.props.addCdsGroup(this.state)
}

handleDeleteCds=(e)=>{
  e.preventDefault();
  let id=e.target.id;
  this.props.deleteCdsGroup(id)
}

render(){
const {cdsGroupList}= this.props
  return (
    <div className="card">
    <form onSubmit={this.handleSubmit}>
      <div className="row">
        <input placeholder="Add CDS Group" className="col mr-2" id="cdsGroup" onChange={this.handleChange}/>
        <button href="" className="btn-small btn-outline-primary waves-effect col-2">Add</button>
    </div>
    </form>
    <div>
    <ul>
      {cdsGroupList && cdsGroupList.map(list =>{
        return(
          <li  key={list.id} >
          <Link to={'/course/' + list.id}>
        <div className="contain chip" >
          <button className="cds col l10 m8 s8" id={list.id} >{list.cdsGroup}</button>
          <i id={list.id} onClick={this.handleDeleteCds}  className="close fas fa-times col l2 m4 s4">delete</i>
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
    cdsGroupList: state.firestore.ordered.cdsGroups,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    addCdsGroup: (cds)=> dispatch(addCdsGroup(cds)),
    deleteCdsGroup: (id)=> dispatch(deleteCdsGroup(id))
  }
}
export default compose(
connect(mapStateToProps, mapDispatchToProps),
firestoreConnect([
  {collection: 'cdsGroups'},
])
)(CDSGroup)


