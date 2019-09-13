import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/messaging';

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyDY6XCDg3p1C5d67K47hFrzkZCsHpOXnOk",
    authDomain: "ibomcds.firebaseapp.com",
    databaseURL: "https://ibomcds.firebaseio.com",
    projectId: "ibomcds",
    storageBucket: "ibomcds.appspot.com",
    messagingSenderId: "1037860293622"
  };

  
    
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });

  firebase.initializeApp(config);
  firebase.firestore().settings({});
  export const storage = firebase.storage();
  export const messaging = firebase.messaging();

messaging.onMessage(payload=>{
  console.log('on message: user inApp');
})
  export default  firebase;