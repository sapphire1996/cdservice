import React from 'react';
import {Link} from 'react-router-dom'
import Footer from '../layout/Footer';

const NotFound =()=>{
    return (
      <div className="container">
        <h5>Not Found</h5>
        <h6>Would You Like to go back <Link to='/'>Home</Link></h6>
        <Footer/>
      </div>
    )
}

export default NotFound
