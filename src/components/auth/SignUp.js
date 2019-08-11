import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp} from '../../store/actions/authAction';
import {Link} from 'react-router-dom';

export class SignUp extends Component {
    state={
        firstName: '',
        lastName: '',
        email: '',
        stateCode: '',
        password: '',
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        } )
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.signUp(this.state)
    }
  render() {
      const {auth, authError} = this.props
      if(auth.uid) return <Redirect to='/'/>
    return (
      <div className="container auth">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Sign Up</h5>
            <div className="input-field">
                <label htmlFor='firstName'>First Name</label>
                <input type='text' id="firstName" onChange={this.handleChange} required/>
            </div>
            <div className="input-field">
                <label htmlFor='lastName'>Last Name</label>
                <input type='text' id="lastName" onChange={this.handleChange} required/>
            </div>
            <div className="input-field">
                <label htmlFor='email'>Email</label>
                <input type='email' id="email" onChange={this.handleChange} required/>
            </div>
            <div>
                <label htmlFor='stateCode'>State Code</label>
                <input type='text' id="stateCode" placeholder="AK/18C/1158" onChange={this.handleChange} required/>
            </div>
            <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input type='password' id="password" onChange={this.handleChange} required/>
            </div>
           
            <div className='input-field'>
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
            <span className="m-3">Have an account? <Link to = "/signin" >Log In</Link></span>
            <div className="center red-text">
            {authError ? <p>{authError}</p> : null}
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
        authError: state.auth.authError
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        signUp: (newUser)=> dispatch(signUp(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
