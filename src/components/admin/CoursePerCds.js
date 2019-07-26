import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {addCourse} from "../../store/actions/adminAction";

class CdsPerLg extends Component {
  state={
    name: '',
    cdsId: ''
}
handleChange=(e)=>{
    this.setState({
        [e.target.name]: e.target.value,
        cdsId: e.target.id
    } )
}
handleSubmit=(e)=>{
    e.preventDefault();
    this.props.addCourse(this.state);
}
  render(){
  const id = this.props.match.params.id;
  const {auth, courses, cdsGroups}= this.props;
  if (!auth.uid) return <Redirect to='/signIn'/>
  var cds;
  if(cdsGroups && cdsGroups.length > 0){
     cds = cdsGroups.find(o => o.id === id);
  }  

  return(
    <div className="container">
    <div>
  {cds && cds !==null?<h1>{cds.cdsGroup}</h1>:null}
    </div>
    <form onSubmit={this.handleSubmit}>
      <div className="row">
        <input placeholder="Add course" id={id} name='name' onChange={this.handleChange}/>
        <button className="btn-small btn-outline-primary waves-effect col-2">Add</button>
    </div>
    </form>
    <div>
    {courses && courses.length > 0 
    ?<ul className="row">
      {courses.map(list =>{
           return (<li key={list.id} className="col">
            <div className="chip pink lighten-4">
            {list.name}
            <i className="close fas fa-times"></i>
            </div>
          </li>)
        })}
      </ul>:
<p>No course under this cds Add Departments...</p>}
  </div>
  </div>
  )  
}
}

const mapStateToProps=(state)=>{
  const courses = state.firestore.ordered.courses;
  const cdsGroups = state.firestore.ordered.cdsGroups;
  
  return{
    cdsGroups: cdsGroups,
    courses: courses,
    auth: state.firebase.auth
   }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    addCourse: (course)=> dispatch(addCourse(course)),
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((ownProps) => {
    if (!ownProps.match.params.id) return []
    return [
      {
        collection: 'courses',
        where: [
          ['cdsId', '==', ownProps.match.params.id]
        ]
      },
      {
        collection: 'cdsGroups'
    },
    ]
  }
  )
)(CdsPerLg);
