import React, { Component } from 'react';
import {connect} from 'react-redux';
import {adminSignUp} from '../../store/actions/authAction'

export class SignUp extends Component {
    state={
        email: '',
        password: '',
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
} )
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.adminSignUp(this.state);
        this.setState({
            [e.target.id]: e.target.value
} )
    }       


  render() {
      const { authError} = this.props
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Register A New Admin</h5>
            <div className="input-field">
                <label htmlFor='email'>Email</label>
                <input type='email' id="email" onChange={this.handleChange} required/>
            </div>
            <div className='input-field'>
                <label htmlFor='password'>Password</label>
                <input type='password' id="password" onChange={this.handleChange} required/>
            </div>
            <div className='input-field'>
            <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
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
        authError: state.auth.authError,

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        adminSignUp: (newUser)=> dispatch(adminSignUp(newUser))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
