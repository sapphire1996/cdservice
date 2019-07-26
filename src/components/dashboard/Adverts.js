import PreviewPicture from "../projects/PreviewPicture";
import React from 'react';
import moment from 'moment';

const Adverts =(props)=>{
  const {adverts} = props;
 
  
    return (
      
      <div className="section">
      <div className=" z-depth-0">
      <div className="card-content">
      <h5 className="formSuccess">You can place your advert here from your profile page</h5>
      <ul className="notifications">
         {adverts && adverts.map(ad =>{
             let div;
             if (ad.approved) {
                 div =(
                  <li key={ad.id} className="col s12 m12 l5 m-3 border card">
                      <p className="pink-text">{ad.product}</p>
                      <PreviewPicture pictureUrl={ad.picture} height="100px" />
                      <p>Call to Action: <span className="pink-text">{ad.action}</span></p>
                      <p>By: <span className="pink-text">{ad.advertizerName} </span></p>
                      <div className="grey-text note-date">
                      {moment(ad.createdAt.toDate()).fromNow()}
                      </div>
                  </li>
             )}
             return div;
         }
         )}
      </ul>
      
      </div>
      </div>
  </div>
    )
}

export default Adverts