import React, { Component } from 'react';
import ReactTable from 'react-table'
import 'react-table/react-table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {connect} from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';
import {Redirect} from 'react-router-dom';
import {deleteRegister} from '../../store/actions/adminAction'
import XLSX from 'xlsx'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [
      ]
    }
    this.exportFile = this.exportFile.bind(this)
  }
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
    this.notify()
  }

  getUsers=() =>{
    let users = [];
    let i;
    firebase.firestore().collection("cdsRegLists")
      .orderBy("codeNumber")
      .get()
      .then(querySnapshot => {
        for (i = 0; i < querySnapshot.docs.length; i++) { 
        users.push(querySnapshot.docs[i].data())
        }
        // console.log(users);
        this.setState({users});
    });
  }
  
  exportFile() {
    let users = [["Full Name", "Course", "Contact","PPA", "State Code", "Local Govt", "Asigned CDS Group"]]
    this.state.users.forEach((user) => {
      let userArray = [user.authorName, user.course, user.phoneNumber, user.ppa, user.codeNumber, user.localGovt, user.cds]
      users.push(userArray)
    })

    const wb = XLSX.utils.book_new()
    const wsAll = XLSX.utils.aoa_to_sheet(users)
    if(!wb.Props) wb.Props = {};
wb.Props.Title = "Insert Title Here";
    XLSX.utils.book_append_sheet(wb, wsAll, "CDS REGISTRATION")
		XLSX.writeFile(wb, "cds-register.xlsx")
  }
  

  render() {  
    const {editables, deleteRegister, auth}= this.props;
    if (!auth.uid) return <Redirect to='/signIn'/>
  
    const heading = editables && editables.map((heading) =>{
      return heading.year + ' BATCH '+ heading.batch +' STREAM '+ heading.stream;
    })  
      
    const userColumns = [
      {
        Header: heading + " CDS REGISTRATION",
        columns: [
          {
            Header: "Full Name",
            id: "fullname",   
            accessor: d => d.authorName
          },
          {
            Header: "Course",
            id: "course",  
            accessor: d => d.course
          },
          {
            Header: "Contact",
            id: "phoneNumber",  
            accessor: d => d.phoneNumber
          },
          {
            Header: "PPA",
            id: "ppa",  
            accessor: d => d.ppa
          },
          {
            Header: "State Code",
            id: "stateCode",  
            accessor: d => d.codeNumber
          },
          {
            Header: "Local Govt",
            id: "localGovt",  
            accessor: d => d.localGovt
          },
          {
            Header: "Asigned CDS Group",
            id: "cds",  
            accessor: d => d.cds
          }
        ]
      }
    ]
    return (
      <div style={style}>
        <div>
          <h1 className="text-center">CDS GROUP REGISTER</h1>
          <button className="col m4 m-2 btn btn-success btn-lg" onClick={this.exportFile}>Download to Excel Sheet</button>
          <h5 className="text-center advert pink-text"><strong>MAKE SURE YOU DOWNLOAD THIS DOCUMENT BEFORE YOU EMPTY THE TABLE</strong></h5>
          <button className="col m4 m-2 btn btn-danger btn-lg" onClick={deleteRegister}>Empty This Table</button>
          <ReactTable
            style={{marginLeft:'-40%', marginRight:'-40%'}}
            data={this.state.users}
            columns={userColumns}
          />
          <ToastContainer/>
        </div>
      </div>
    );
  }
}

const style = {
  display: 'flex',
  justifyContent: 'center',
}

const mapStateToProps=(state)=>{
  console.log(state);
  return{
      editables: state.firestore.ordered.editables,
      auth: state.firebase.auth,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    deleteRegister: ()=> dispatch(deleteRegister())
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps), 
  firestoreConnect([
      {collection: 'editables'}
  ])
)(App)