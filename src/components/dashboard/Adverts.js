import React from 'react';
import Slider from 'react-animated-slider';
import  'react-animated-slider/build/horizontal.css';
import moment from 'moment';

const Adverts =(props)=>{
  const {adverts} = props;
  
    return (
      <div className="card-content">
      <p className="formSuccess text-center head">You can place your advert here from your profile page</p>
      <ul className="notifications">
    <Slider autoplay={3000}>
        {adverts && adverts.length >= 1 ? adverts && adverts.map((ad, index) => (
          <div
            key={index}
            style={{ background: `url('${ad.picture}') no-repeat center center`, width:`100%`}}
          >
            <div className="center">
              <h2 className="pink-text"><strong>{ad.product}</strong></h2>
              <h2 className="grey-text styled"><strong>By {ad.displayName}</strong></h2>
              <h3><strong><span role="img" aria-label="emoji">👉</span><span className="pink-text styled">{ad.action}</span></strong></h3>
              <div className="grey-text note-date"><strong>{moment(ad.createdAt.toDate()).fromNow()}</strong></div>
            </div>
          </div>
        )):<h4 className="advert  text-center detail"><strong>Place Adverts here for as low as #200</strong></h4>}
      </Slider>
      </ul>
      </div>
    )
}

export default Adverts

  