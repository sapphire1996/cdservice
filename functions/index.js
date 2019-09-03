const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello here Firebase!");
});
function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          var notification = new Notification("Hi there!");
        }
      });
    }
  
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
  }
const createNotification=((notification) =>{
    return admin.firestore().collection('notifications')
    .add(notification)
    .then((doc)=> console.log('notification added', doc));
})

exports.projectCreated = functions.firestore
.document('/projects/{projectId}')
.onCreate(doc=>{
    const project = doc.data();
    const notification ={
        content: 'Added a new project',
        user: `${project.authorFullName} `,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
});

// exports.userJoined = functions.auth.user().onCreate(user =>{
//     return admin.firestore().collection('users').doc(user.uid).get()
//     .then(doc =>{
//         const newUser = doc.data();
//         const notification = {
//             content: 'joined CDS',
//             user: `${newUser.firstName} ${newUser.lastName}`,
//             time: admin.firestore.FieldValue.serverTimestamp()
//         }
//         return createNotification(notification)
//     })
// })
