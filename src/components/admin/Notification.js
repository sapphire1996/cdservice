import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';

const Notifications =(props)=>{
    const {notifications} = props;
return(
    <div className="card border z-depth-0">
    <details className="card-content">
    <summary className="card-title">Notifications<i className="pink-text material-icons right">notifications_active</i></summary>
    <ul className="notifications">
       {notifications && notifications.map(item =>{
           return(
               <li key={item.id}>
               <Link to="/">
                <span className="pink-text">{item.user} </span>
                <span>{item.content}</span>
                <div className="grey-text note-date">
                {moment(item.time.toDate()).fromNow()}
                </div>
                </Link>
               </li>
           )}
       )}
    </ul>
    </details>
    </div>
)
}

export default Notifications