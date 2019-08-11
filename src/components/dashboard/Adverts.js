import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import moment from 'moment';

const Adverts =(props)=>{
  const {adverts} = props;
 console.log(adverts);
  
    return (
      <div className="section ">
      <div className=" z-depth-0">
      <div className="card-content">
      <p className="formSuccess text-center detail head">You can place your advert here from your profile page</p>
      <ul className="notifications">
     {/* direction="vertical"   */}
    <Slider autoplay={1000}>
        {adverts && adverts.length >= 1 ? adverts && adverts.map((ad, index) => (
          <div
            key={index}
            style={{ background: `url('${ad.picture}') no-repeat center center`, width:`100%`}}
          >
            <div className="center">
              <h1 className="pink-text detail"><strong>{ad.product}</strong></h1>
              <h2 className="advertizer"><strong>By {ad.displayName}</strong></h2>
              <h3><strong><span role="img">👉</span><span className="pink-text detail">{ad.action}</span></strong></h3>
              <div className="grey-text note-date"><strong>{moment(ad.createdAt.toDate()).fromNow()}</strong></div>
            </div>
          </div>
        )):<h4 className="advert pink-text text-center detail"><strong>Place Adverts here for as low as #200</strong></h4>}
      </Slider>
      </ul>
      </div>
      </div>
  </div>
    )
}

export default Adverts

  