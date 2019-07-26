import React, { Component } from 'react';
import {connect} from 'react-redux';
import {resetPassword} from '../../store/actions/authAction';
import { Redirect } from 'react-router-dom';

export class PasswordReset extends Component {
    state={
        email: ''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        } )
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.resetPassword(this.state);
    }
  render() {
    const {authError, auth}= this.props
    if(auth.uid) return <Redirect to='/'/>
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Reset Password</h5>
            <div className="input-field">
                <label htmlFor='email'>Enter Your Account Email</label>
                <input type='email' id="email" onChange={this.handleChange}/>
            </div>
            <div className='input-field'>
            <button className="btn pink lighten-1 z-depth-0">Request Password Reset</button>
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    resetPassword: (credential)=> dispatch(resetPassword(credential))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset)
