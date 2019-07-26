import React, {Component} from 'react';
import Form from '../admin/Form';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

class Registration extends Component{

    viewRecords=()=>{
        this.props.history.push('/register');
    }
    editGuidline=()=>{
        this.props.history.push('/guildline');
    }
    render(){
        const {auth} = this.props;    
        if (!auth.uid) return <Redirect to='/signIn'/>
           return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col s12 m6">
                    <Form/>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        auth: state.firebase.auth,
    }
}

export default connect(mapStateToProps)(Registration)
