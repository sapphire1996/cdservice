import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDY6XCDg3p1C5d67K47hFrzkZCsHpOXnOk",
    authDomain: "ibomcds.firebaseapp.com",
    databaseURL: "https://ibomcds.firebaseio.com",
    projectId: "ibomcds",
    storageBucket: "ibomcds.appspot.com",
    messagingSenderId: "1037860293622"
  };
  firebase.initializeApp(config);
  firebase.firestore().settings({});
  export const storage = firebase.storage();

  export default  firebase;