import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {addLocalGovtCds} from "../../store/actions/adminAction";

class CdsPerLg extends Component {
  state={
    name: '',
    cdsId: ''
}
handleChange=(e)=>{
    this.setState({
        cdsGroup: e.target.value,
        cdsId: e.target.id
    } )
}
handleSubmit=(e)=>{
    e.preventDefault();
    this.props.addLocalGovtCds(this.props.match.params.id, this.state.cdsGroup);
}

  render(){
  const id = this.props.match.params.id;
  const {auth, cdsGroupList, localGovtList}= this.props;
  if (!auth.uid) return <Redirect to='/signIn'/>
  let lgovt;
  if(localGovtList && localGovtList.length > 0){
     lgovt = localGovtList.find(list =>list.id === id)
  }
  return(
    <div className="container">
    <div>
    {lgovt && lgovt !==null?<h1>{lgovt.localGovt}</h1>:null}
    </div>
    <form onSubmit={this.handleSubmit}>
      <div className="row">
      <select 
            ref="userInput" 
            id="cdsGroup" 
            defaultValue="Add CDS to this Local goverment"
            onChange={this.handleChange} required>
            <option disabled>Add CDS to this Local goverment</option>
            {
            cdsGroupList && cdsGroupList.map((opt) =>{
                return <option key={opt.id}
                  value={opt.cdsGroup}>{opt.cdsGroup}</option>;
              })
            }
        </select>
        <button className="btn-small btn-outline-primary waves-effect col-2">Add</button>
    </div>
    </form>
    <div>
    {lgovt && lgovt !==null?<ul className="row">
      {lgovt.cdsGroup && lgovt.cdsGroup.map(cds=>{
           return (<li key={cds} className="col chip pink lighten-4">
            {cds}
            <i className="close fas fa-times"></i>
          </li>)
        })}
      </ul>:
<p>No CDS under this local goverment yet. Add Departments...</p>}
  </div>
  </div>
  )  
}
}

const mapStateToProps=(state)=>{  
  return{
    cdsGroupList: state.firestore.ordered.cdsGroups,
    localGovtList: state.firestore.ordered.localGovtList,
    auth: state.firebase.auth
   }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    addLocalGovtCds: (localgovtId, localgovtcds)=>dispatch(addLocalGovtCds(localgovtId, localgovtcds))
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((ownProps) => {
    if (!ownProps.match.params.id) return []
    return [
      {collection: 'cdsGroups'},
      {
        collection: 'localGovtList'
    }

    ]
  }
  )
)(CdsPerLg);
