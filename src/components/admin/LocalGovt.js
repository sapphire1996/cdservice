import React, { Component } from 'react';
// import CdsList from "./CdsList";
import {connect} from 'react-redux';
import {compose} from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { addLocalGovt } from "../../store/actions/adminAction";
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
render(){
const {localGovtList}= this.props
// console.log(localGovtList)
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
          <div className="contain">
            <button className="cds" id={lglist.id} >{lglist.localGovt}</button>
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
    localGovtList: state.firestore.ordered.localGovtList,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    addLocalGovt: (localgovt)=> dispatch(addLocalGovt(localgovt))
  }
}
export default compose(
connect(mapStateToProps, mapDispatchToProps),
firestoreConnect([
  {collection: 'localGovtList'},
])
)(LocalGovt)


