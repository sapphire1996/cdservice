import React, { Component } from 'react';
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import { asignCds } from "../../store/actions/adminAction";
import {VerticleButton as ScrollUpButton} from "react-scroll-up-button";


class RegTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
      ],
      id: '',
      cds: '',
      isHidden: false,
    }
  }

  //toast
  notify = () => toast('Loading...Pls, wait!', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
    });

  componentDidMount=()=>{ 
    this.getUsers();
    this.notify();
  }
  
 //setting state with registered corpers
  getUsers=() =>{
    let users = [];
    let i;
    firebase.firestore().collection("cdsRegLists")
    .where("cds", "==", "").get()
      .then(querySnapshot => {
        for (i = 0; i < querySnapshot.docs.length; i++) { 
        users.push(querySnapshot.docs[i].data())
        }
        this.setState({users});
      });
  }
    //get Local govt
    getLg= (localGovtArea)=>{
     if(this.props.localGovtList && this.props.localGovtList.length > 0){
        let lgovt = this.props.localGovtList.find(list =>list.localGovt === localGovtArea);
        return lgovt;
     }
   }

  handleChange=(e)=>{
    e.preventDefault();
    let id = e.target.id;
    let cds = e.target.value;
    let isHidden= !this.state.isHidden
      this.setState({id,cds,isHidden})
 }
 
 handleSubmit=(e)=>{
  e.preventDefault();
  this.props.asignCds(this.state.id, this.state.cds);
  this.getUsers();
}
  render() {  
    const {editables, auth, users}= this.props;
    let user
    if(auth.uid && users){
       user =users && users.find(user=> user.id === auth.uid);
    } 
    if (!auth.uid) return <Redirect to='/signIn'/>
    if(auth.uid && user && !user.isAdmin) return <Redirect to='/'/>

      const heading = editables && editables.map((heading) =>{
      return heading.year + ' BATCH '+ heading.batch +' STREAM '+ heading.stream;
    }) 
    
    return (
      <div style={style}>
        <div>
          <h1 className="text-center">{heading}</h1>
          <table id="table" >
            <thead>
              <tr id="con">
                  <th>State Code</th>
                  <th>Full Name</th>
                  <th>Course</th>
                  <th>Local Govt</th>
                  <th>PPA</th>
                  <th>Asigned CDS Group</th>
              </tr>
            </thead>
            <tbody>
             {this.state.users && this.state.users.length > 0? this.state.users.map((user) => {
                 return  <tr key={user.identity}>
                    <td>{user.codeNumber}</td>
                    <td>{user.fullName}</td>
                    <td>{user.course}</td>
                    <td>{user.localGovt}</td>
                    <td>{user.ppa}</td>
                    <td><input id={user.identity}  list={user.localGovt} type="text" onChange={this.handleChange}/>
                    <datalist id={user.localGovt}>
                    {this.getLg(user.localGovt).cdsGroup && this.getLg(user.localGovt).cdsGroup.map((cds)=>{
                    return <option  key={cds}>{cds}</option>})
                    }
                    </datalist>
                    </td>
                    {this.state.isHidden && <td><button onClick={this.handleSubmit}>asign</button></td>}
                  </tr>
              }):<tr><td style={s} colSpan="6">No submitted item yet</td></tr>}
            </tbody>
             </table>
          <ToastContainer/>
        </div>
        <ScrollUpButton style={{zIndex: '2000'}}/>
      </div>
    );
  }
}

const s={
  textAlign:"center"
}
const style = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '5em',
}

const mapStateToProps=(state)=>{
  
  return{
    auth: state.firebase.auth,
    editables: state.firestore.ordered.editables,
    localGovtList: state.firestore.ordered.localGovtList,
    cdsRegLists: state.firestore.ordered.cdsRegLists,
    users: state.firestore.ordered.users,

  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    asignCds: (authorId, asignedCds)=> dispatch(asignCds(authorId, asignedCds))
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps), 
  firestoreConnect([
      {collection: 'editables'},
      {collection: 'localGovtList'},
      {collection: 'cdsRegLists'},
      {collection: 'users'},
  ])
)(RegTable)