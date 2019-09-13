import React, { Component } from 'react';
import moment from 'moment';
import firebase from 'firebase/app';


class AdvertIncome extends Component{
    constructor(props) {
        super(props)
        this.state = {
          rangeOne: '',
          rangeTwo: '',
          income: []
        }
      }
      handleChange=(e)=>{
        this.setState({
            [e.target.id]: e.target.value
        } )
    }
      getAdvertIncome=(e) =>{
          e.preventDefault();
        const rangeOneDate = new Date(this.state.rangeOne);
        //date two
        const rangeTwoDate = new Date(this.state.rangeTwo);                   
        let income = [];
        let i;
        firebase.firestore().collection("adverts")
        .where("createdAt", ">=",rangeOneDate).where("createdAt", "<=", rangeTwoDate)
          .get()
          .then(querySnapshot => {
            for (i = 0; i < querySnapshot.docs.length; i++) { 
            income.push(querySnapshot.docs[i].data())
            }
            this.setState({income});
            this.render();

        });
      }

render(){

  return (
    <div className="section m-3">
    <div className="z-depth-0">
    <div className="card-content border card">
    <h1 className="text-center"><strong>Adverts Income</strong></h1>
    <div className="">
      <div className="col m6">
        <label>Starting From</label>
        <input 
          type="date" 
          id="rangeOne"
          value={this.state.rangeOne} 
          onChange={this.handleChange}/>
      </div>
      <div className="col m6">
        <label>To</label>
        <input
          type="date"
          id="rangeTwo"
          value={this.state.rangeTwo}
          onChange={this.handleChange}/>
      </div>
    </div>

    <button className="btn text-white m-3 pink lighten-1 waves-effect" onClick={this.getAdvertIncome}>Check</button>
    <ul className="notifications m-3">
       {this.state.income && this.state.income.length > 0 ? this.state.income && this.state.income.map(adIncome =>{
           return <li key={adIncome.authorId}>
                    <div className="">
                    {moment(adIncome.createdAt.toDate()).format('ll')} - #{adIncome.amountPaid} - {adIncome.advertizerName}
                    </div>
                </li>
           }):<p>There is no income for this dates</p>}
    </ul>
    </div>
    </div>
</div>
  )
}
}


export default AdvertIncome;


