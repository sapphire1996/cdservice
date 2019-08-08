import React, { Component } from 'react';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import { submitForm } from "../../store/actions/formAction";
// import {Redirect} from 'react-router-dom'
import { withRouter} from 'react-router-dom';



const initialState={
  firstName: '',
  lastName: '',
  phoneNumber: '',
  ppa: '',
  localGovt: '',
  course: '',
  stateCode: '',
  codeNumber: '',
  cds:''
}

export class Form extends Component { 
  state=initialState;

validate = () => {
  let firstNameError = "";
  let lastNameError = "";
  let phoneNumberError = "";
  let ppaError = "";
  let courseError = "";
  let stateCodeError = "";
  let localGovtError = "";

  if (!this.state.firstName) {
    firstNameError = "first name cannot be blank";
    this.setState({firstNameError})
  }else{
    this.setState({firstNameError: ""})
  }

  if (!this.state.lastName) {
    lastNameError = "oh!, could you have forgot your last name?";
    this.setState({lastNameError})
  }else{
    this.setState({lastNameError: ""})
  }

  if (!this.state.phoneNumber) {
    phoneNumberError = "make sure you are inputing your phone number corectly";
    this.setState({phoneNumberError})
  }else{
    this.setState({phoneNumberError: ""})
  }

  if (!this.state.ppa) {
    ppaError = "Pls, write your place of primary assignment";
    this.setState({ppaError})
  }else{
    this.setState({ppaError: ""})
  }

  if (!this.state.localGovt) {
    localGovtError = "this should be your ppa local govt";
    this.setState({localGovtError})
  }else{
    this.setState({localGovtError: ""})
  }

  if (!this.state.course) {
    courseError = "it's fine if your course isn't part of the options, just type it";
    this.setState({courseError})
  }else{
    this.setState({courseError: ""})
  }

  if (!this.state.codeNumber) {
    stateCodeError = "ops! I think you forgot your state code";
    this.setState({stateCodeError})
  }else{
    this.setState({stateCodeError: ""})
  }
 
  if (firstNameError || lastNameError || phoneNumberError || ppaError || localGovtError || courseError || stateCodeError) {
    return false;
  }else{
     this.setState(initialState)
     return true;
  }
};
handleChange=(e)=>{
  e.preventDefault()
  this.setState({
      [e.target.id]: e.target.value
  } )
}

  handleSubmit=(e)=>{
    e.preventDefault();
    const isValid = this.validate();
    const fullName= this.state.firstName +" " +this.state.lastName;
    const phoneNumber= this.state.phoneNumber;
    const ppa= this.state.ppa;
    const localGovt= this.state.localGovt;
    const course=this.state.course;
    const codeNumber= this.state.codeNumber;

    let asignCds;
    const courses =this.props.courses;
    const cdsGroups = this.props.cdsGroups;

    //asign cds automatically provided the there is
    let promise = new Promise(function(resolve, reject) {
      if(course){
        asignCds=((course)=>{
         let auto = courses.find(c=>c.name === course)
         let group = cdsGroups.find(cds=>cds.id===auto.cdsId)
         let asignedCds;
         if(group){
             asignedCds=group.cdsGroup;
           }else{
            asignedCds = '';
           }
           return asignedCds
         })(course);
     }
      setTimeout(() => resolve(asignCds), 1000);
    });
    // resolve runs the first function in .then
    promise.then(
      result => {
        console.log(result);
        this.setState({cds:result});
        if (isValid) {
          const submit =  {
          fullName: fullName,
          phoneNumber: phoneNumber, 
          ppa: ppa,
          localGovt: localGovt,
          course: course,
          codeNumber: codeNumber,
          cds: this.state.cds
        }
            this.props.submitForm(submit);
            // clear form
            this.setState(initialState);
            //go to profile
            if(this.props.auth.uid){
              this.props.history.push('/profile/'+this.props.auth.uid);
            }
          }
            }, // shows "done!" after 1 second
      error => console.log(error) // doesn't run
    );
  }

  render() {
    const {courses, editables, localGovtList}= this.props  
    return (
      <div className="card z-depth-0 text-center">
      {editables && editables.map((heading) =>{
          return <h3 key={heading.id}><strong>{heading.year + ' BATCH '+ heading.batch +' STREAM '+ heading.stream}</strong></h3>;
        })}
      
      <form action="" className="card z-depth-0" onSubmit={this.handleSubmit}>
        <div>
          <div className="col">
          <input
            className="col"
            id="firstName"
            type="text"
            placeholder="first name" 
            value={this.state.firstName}
            onChange={this.handleChange}
          />
          <div className="formError">
            {this.state.firstNameError}
          </div>
          <input 
            className="col"
            id="lastName" 
            type="text"
            placeholder="last name"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
          <div className="formError">
            {this.state.lastNameError}
          </div>
          <input
           className="col"
           id="phoneNumber" 
           type="number"
           placeholder="Phone Number"
           value={this.state.phoneNumber}
           onChange={this.handleChange}
          />
          <div className="formError">
            {this.state.phoneNumberError}
          </div>
          <input
           className="col"
           id="ppa" 
           placeholder="PPA" 
           type="text"
           value={this.state.ppa}
           onChange={this.handleChange}
          />
          <div className="formError">
            {this.state.ppaError}
          </div>
          <select 
            ref="userInput" 
            id="localGovt" 
            defaultValue="Select your ppa local government"
            onChange={this.handleChange} required>
            <option disabled>Select your ppa local government</option>
            {
            localGovtList && localGovtList.map((list) =>{
                return <option key={list.id}
                  value={list.name}>{list.localGovt}</option>;
              })
            }
        </select>
        <div className="formError">
            {this.state.localGovtError}
        </div>
          <select 
            ref="userInput" 
            id="course" 
            defaultValue="Select your course"
            onChange={this.handleChange} required>
            <option disabled>Select your course</option>
            {
            courses && courses.map((opt) =>{
                return <option key={opt.id}
                  value={opt.name}>{opt.name}</option>;
              })
            }
        </select>
        <div className="formError">
            {this.state.courseError}
        </div>
        <div>
        <span htmlFor='codeNumber '>StateCode:</span>
          <input 
            className="col-3" 
            id="codeNumber" 
            placeholder="AK/18C/1158" 
            type="text"
            value={this.state.codeNumber}
            onChange={this.handleChange}
          />
          <div className="formError">
            {this.state.stateCodeError}
          </div>
          </div>
          <button className="btn btn-indigo">Register For CDS</button>
          </div> 
        </div>
     </form>
    </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    auth: state.firebase.auth,
    editables: state.firestore.ordered.editables,
    courses: state.firestore.ordered.courses,
    localGovtList: state.firestore.ordered.localGovtList,
    cdsGroups: state.firestore.ordered.cdsGroups
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    submitForm: (form)=> dispatch(submitForm(form))
  }
}
export default withRouter( compose(
    connect(mapStateToProps, mapDispatchToProps), 
    firestoreConnect([
      {collection: 'editables'},
      {collection: 'courses'},
      {collection: 'localGovtList'},
      {collection: 'cdsGroups'}
    ])
)(Form))
