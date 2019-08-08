import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createAdvert } from "../../store/actions/advertAction";
import PreviewPicture from '../projects/PreviewPicture';
import RavePaymentModal from 'react-ravepayment';
import {Redirect} from 'react-router-dom'


export class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      action: "",
      picture: null,
      pictureUrl: null,
      duration: '',
      key: "FLWPUBK_TEST-0f63793d23cd1f3e004bdc515f744d2f-X", // RavePay PUBLIC KEY
      email: "", // customer email
      amount: null,
      paid: false,
      successMessage: "",
      submited: false
    };
  }
   
 
  callback = (response) => {
    if(response.success ||response.data.data.status ==="successful"){
      this.setState({
        paid:true,
        successMessage: 'Payment was successful'
      })
    }
  }

  close = () => {
    console.log("Payment closed");
  }

  getReference = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

    for( let i=0; i < 10; i++ )
      text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
  }
  onTitleChange= (e) =>{
    this.setState({ product : e.target.value});
 }
 onContentChange =(e) =>{
    this.setState({ action : e.target.value});
 }
 onAmountChange=(e)=>{
   let amt = e.target.value
  this.setState({ amount : Number(amt)});
  if(amt==="200"){
    this.setState({ duration : 1});
  }else if(amt==="500"){
    this.setState({ duration : 7});
  }else{
    this.setState({ duration : 30});
  }
 }
 onEmailchange=(e)=>{
  this.setState({ email : e.target.value});

 }
 onPictureChange= (e) =>{
  let reader = new FileReader();
  let file = e.target.files[0];  
  reader.onloadend= ()=>{
      this.setState({
          picture: file,
          pictureUrl: reader.result
      });
  };
  reader.readAsDataURL(file)
 }
   
  handleSubmit=(e)=>{
    e.preventDefault()
      this.props.createAdvert(this.state);
      this.setState({
        product: "",
        action: "",
        picture: null,
        pictureUrl: null,
        email: "", 
        amount: null,
        successMessage: 'Your Ad Has Been Submitted For Review! Kindly refresh if you need to submit another advert',
        submited: true
      })
}
    
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signIn'/>

    return (
      <div className="p-1">
     
        <form onSubmit={this.handleSubmit} className="white">
            <h5 className="grey-text text-darken-3">Make it brief! The more brief, the more the visibility</h5>
            <div >
                <label htmlFor='title'>Content</label>
                <input 
                type='text'
                 id="product" 
                 placeholder="interest in this 6 inches bed for #4500?" 
                 value={this.state.product}
                 onChange={this.onTitleChange}/>
            </div>
            <div >
                <label htmlFor='content'>Call To Action</label>
                <input 
                  type='text' 
                  id="action" 
                  placeholder="call: 09145455840 now!" 
                  value={this.state.action}
                  onChange={this.onContentChange} />
            </div>
            <div >
                <label htmlFor='email'>Advertizer Email</label>
                <input
                  type='text' id="email"
                  placeholder="awesome@you.com" 
                  value={this.state.email}
                  onChange={this.onEmailchange} />
            </div>
            <div>
              <p>Choose an image for your advert(not too big size)</p>
            <input
               type="file"
               placeholder='image for advert'
               className="form-control"
               onChange={this.onPictureChange}
            accept="image/gif, image/jpeg, image/png" 
               />
               </div>
               <hr />
                <b>Preview</b>
                <br />
                <div className="border advertFormPreview">
               <PreviewPicture pictureUrl={this.state.pictureUrl} height="200px" />
               </div>
            <div >
                <select required defaultValue="choose Advert plan" onChange={this.onAmountChange}>
                    <option disabled>choose Advert plan</option>
                    <option value="200">Advertize For one day only for #200</option>
                    <option value="500">Advertize For one week for #500 </option>
                    <option value="1000">Advertize For one month for #1000</option>
                </select>
            </div>
            {this.state.paid?<p className="formSuccess">{this.state.successMessage}</p>:null}
            {this.state.paid && this.state.submited===false?<div><button type="submit">Submit</button></div>:null}
        </form>
        {this.state.amount!==null && this.state.email!=='' && this.state.paid===false?
               <div className='App'>
               <p className='App-intro'>
                 <RavePaymentModal
                   text="Check out"
                   class="payButton"
                   metadata={[{metaname:'Device', metavalue : 'IPhone X'}]}
                   reference={this.getReference()}
                   email={this.state.email}
                   amount={this.state.amount}
                   ravePubKey={this.state.key}
                   callback={this.callback}
                   close={this.close}
                       isProduction={false}
                       tag="button" /*it can be button or a or input tag */
                 />
               </p>
             </div>
            :null}
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
      auth: state.firebase.auth
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    createAdvert: (data)=> dispatch(createAdvert(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
