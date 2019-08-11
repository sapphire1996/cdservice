import React, { Component } from 'react';
import {connect} from 'react-redux';
import {signIn} from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import {Link} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';

export class SignIn extends Component {
    state={
        email: '',
        password: ''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        } )
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.signIn(this.state);
        this.render();
    }
  render() {
    const {authError, auth, users}= this.props;
  
    let user
    if(auth.uid && users){
       user =users && users.find(user=> user.id === auth.uid);
      
    }
    if(auth.uid && user && user.isAdmin === true) return <Redirect to='/admin'/>
    if(auth.uid && user && user.isAdmin === false) return <Redirect to='/'/>
    return (
      <div className="container auth">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign In</h5>
            <div className="input-field">
                <label htmlFor='email'>Email</label>
                <input type='email' id="email" onChange={this.handleChange}/>
            </div>
            <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input type='password' id="password" onChange={this.handleChange}/>
            </div>
            <div className='input-field'>
            <button className="btn pink lighten-1 z-depth-0">Log In</button>
            <span className="m-3">Don't have an account? <Link to = "/signup" >Sign Up</Link></span>
            <div className="center red-text">
            {authError ? <p>{authError}</p> : null}
            </div>
            <NavLink to = "/resetpassword" >Forget Password?</NavLink>

            </div>
        </form>
        {/* <Footer/> */}
      </div>
    )
  }
}
const mapStateToProps=(state)=>{  
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth,
    users: state.firestore.ordered.users,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    signIn: (creds)=> dispatch(signIn(creds))
  }
}
export default compose(connect(mapStateToProps, mapDispatchToProps), 
firestoreConnect(props =>[
  {collection: 'users' 
    }
]))(SignIn)
// where: [
//   ['id', '==', props.auth.uid]
// ]