import React, { Component } from 'react';
import {connect} from 'react-redux';
import { createAdvert,progress } from "../../store/actions/advertAction";
import PreviewPicture from '../projects/PreviewPicture';
import RavePaymentModal from 'react-ravepayment';
import {Redirect} from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import {compose} from 'redux';

export class AdvertForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      displayName: "",
      action: "",
      picture: null,
      pictureUrl: null,
      duration: '',
      key: "FLWPUBK-850c3ee6959a0ae7046dc28695f11717-X", // RavePay PUBLIC KEY
      email: "", // customer email
      amount: null,
      paid: false,
      successMessage: "",
      submited: false,
      token: 'unsubscribed',
      progress: progress,
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
 onDisplayNameChange=(e)=>{
  this.setState({ displayName : e.target.value});
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
  if (file && file.type.match('image.*')) {
    reader.readAsDataURL(file);
    reader.onloadend= ()=>{
      this.setState({
          picture: file,
          pictureUrl: reader.result
      });
  };
  } else {
   return;
  }
 
  reader.onerror = function(event) {
    console.log(event);
    reader.abort();
  };
  
 }

 onCheckToken=()=>{
  if(this.props.tokens){
    let userToken =this.props.tokens && this.props.tokens.find(token=>token.userId===this.props.auth.uid);
    if(userToken){
      this.setState({
        token: userToken.token
      })
    }}
 }
 
 handleSubmit=(e)=>{
   this.onCheckToken()
    e.preventDefault()
      this.props.createAdvert(this.state);
      this.setState({
        product: "",
        action: "",
        displayName: "",
        picture: null,
        pictureUrl: null,
        email: "", 
        amount: null,
        successMessage: 'Your Ad is Submitted For Review! Kindly refresh if you need to submit another advert',
        submited: true,
        progress: 100
      })
}
    
  render() {
    const { auth} = this.props;
    if (!auth.uid) return <Redirect to='/signIn'/>
  
    
    return (
      <div className="p-1">
        <form onSubmit={this.handleSubmit} className="white">
        <p className="grey-text text-darken-3">Make sure you are subcribed to notification before placing an advert</p>

            <p className="pink-text">Make it brief! </p>
            <div >
                <label htmlFor='title'>Content</label>
                <input 
                type='text'
                 id="product" 
                 placeholder="Discribe what you are adverting here" 
                 value={this.state.product}
                 onChange={this.onTitleChange}
                 maxLength="40"
                 required/>
            </div>
            <div >
                <label htmlFor='title'>Display Name</label>
                <input 
                type='text'
                 id="displayName" 
                 value={this.state.displayName}
                 onChange={this.onDisplayNameChange}
                 maxLength="25"
                 required/>
            </div>
            <div >
                <label htmlFor='content'>Call To Action</label>
                <input 
                  type='text' 
                  id="action" 
                  maxLength="40"
                  placeholder="call: 09145455840 for enquires!" 
                  value={this.state.action}
                  onChange={this.onContentChange} 
                  required/>
            </div>
            <div >
                <label htmlFor='email'>Advertizer Email</label>
                <input
                  type='text' id="email"
                  placeholder="awesome@you.com" 
                  value={this.state.email}
                  onChange={this.onEmailchange} 
                  required/>
            </div>
            <p>
              <label>
                <input type="checkbox" onChange={this.onCheckToken} required/>
                <span>I am subscribed to notification</span>
              </label>
            </p>
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
            {this.state.paid?<div>
              <div className="progress" data-label={this.state.progress+'% done'}>
                <span className="value" style={{width: this.state.progress+'%'}}></span>
              </div>
              </div>:null}
            {this.state.paid&&this.state.progress===100?<p className="formSuccess text-center">{this.state.successMessage}</p>:null}

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
                       isProduction={true}
                       tag="button" 
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
      auth: state.firebase.auth,
      tokens: state.firestore.ordered.tokens
    }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    createAdvert: (data)=> dispatch(createAdvert(data))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect(() => {        
    return [
      {collection: 'tokens'}
    ]
  }
  )
)(AdvertForm);
