import React, {Component} from 'react';
import {connect} from 'react-redux';
import {sendNotification} from '../../store/actions/adminAction';
import Accordion from 'react-collapsy';
import 'react-collapsy/lib/index.css';

class SendNotification extends Component{
state={
    content: ''
}
 accordions = document.getElementsByClassName("accord");

handleChange=(e)=>{
    this.setState({
        [e.target.id]: e.target.value
    } )
}
handleSend=(e)=>{
e.preventDefault();
this.props.sendNotification(this.state)
this.setState({ content: ''})
}   
    render(){
        return(
        <Accordion title='Send notification to corp members'>
            <p>
            <input id="content" value={this.state.content} placeholder="message goes here" onChange={this.handleChange}></input>
            <button onClick={this.handleSend}>Send Notification</button>
            </p>
        </Accordion>
        );
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        sendNotification: (content) =>dispatch(sendNotification(content))  }
}
export default connect(null, mapDispatchToProps)(SendNotification)
