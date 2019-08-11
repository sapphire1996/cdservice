import React, { Component } from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import moment from 'moment';
import { firestoreConnect } from 'react-redux-firebase';
import { approveAdvert } from "../../store/actions/advertAction";
import { deleteAdvert } from "../../store/actions/advertAction";
import PreviewPicture from "../projects/PreviewPicture";

class Adverts extends Component{
handleApproveAdvert=(e)=>{
let id=e.target.id;;
this.props.approveAdvert(id)
}
handleDeleteAdvert=(e)=>{
  let id=e.target.id;
  this.props.deleteAdvert(id);
}
render(){
const {adverts}= this.props

  return (
    <div className="section border">
    <div className="z-depth-0">
    <div className="card-content">
    <h1 className="text-center"><strong>Adverts</strong></h1>
    <ul className="notifications">
       {adverts ? adverts.map(ad =>{
           return <li key={ad.id} className="col s12 m12 l5 m-3 border card">
            <small className="formSuccess">{ad.advertizerName + " just paid for a " + ad.duration + " day(s) advert"}</small>
            <div className="grey-text note-date">
            {moment(ad.createdAt.toDate()).fromNow()}
            </div>
            <PreviewPicture pictureUrl={ad.picture} height="100px" />
            <span>{ad.product}</span>
            <div className="grey-text note-date">
            {moment(ad.createdAt.toDate()).fromNow()}
            </div>
            {ad.approved?<div>
            <button 
            id={ad.id} 
            className="btn pink lighten-1 text-white waves-effect" 
            onClick={this.handleDeleteAdvert}>delete</button>
            <p className="pink-text small">this advert will be deleted once it is overdue</p>
            </div>:<button 
            id={ad.id}
            className="btn pink lighten-1 text-white waves-effect" 
            onClick={this.handleApproveAdvert}>approve</button>}
            
        </li>
           }):<span>no running advert</span>
           }
    </ul>
    </div>
    </div>
</div>
  )
}
}
const mapStateToProps=(state)=>{
  return{
    adverts: state.firestore.ordered.adverts,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    approveAdvert: (id)=> dispatch(approveAdvert(id)),
    deleteAdvert: (id)=> dispatch(deleteAdvert(id))
  }
}
export default compose(
connect(mapStateToProps, mapDispatchToProps),
firestoreConnect([
  {collection: 'adverts'},
])
)(Adverts)


