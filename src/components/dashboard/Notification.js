import React from 'react';
import moment from 'moment';

const Notifications =(props)=>{
    const {notifications} = props;
return(
<div className="section">
    <div className="card z-depth-0">
    <details className="card-content">
    <summary className="card-title">Notifications</summary>
    <ul className="notifications">
       {notifications && notifications.map(item =>{
           let div;
           if (item.content !== 'joined CDS') {
               div =(
               <li key={item.id}>
                <span className="pink-text">{item.user} </span>
                <span>{item.content}</span>
                <div className="grey-text note-date">
                {moment(item.time.toDate()).fromNow()}
                </div>
               </li>
           )}
           return div;
       }
       )}
    </ul>
    </details>
    </div>
</div>
)
}

export default Notifications