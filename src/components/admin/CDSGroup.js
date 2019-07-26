import React, { Component } from 'react';
// import CdsList from "./CdsList";
import {connect} from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addCdsGroup } from "../../store/actions/adminAction";
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
        <div className="contain" >
          <button className="cds" id={list.id} >{list.cdsGroup}</button>
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
  // console.log(state);
  return{
    cdsGroupList: state.firestore.ordered.cdsGroups,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    addCdsGroup: (cds)=> dispatch(addCdsGroup(cds))
  }
}
export default compose(
connect(mapStateToProps, mapDispatchToProps),
firestoreConnect([
  {collection: 'cdsGroups'},
])
)(CDSGroup)


