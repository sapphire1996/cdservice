const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

  // Clean invalid tokens
  function cleanInvalidTokens(tokensWithKey, results) {

    const invalidTokens = [];

    results.forEach((result, i) => {
      if ( !result.error ) return;

      console.error('Failure sending notification to', tokensWithKey[i].token, result.error);
      
      switch(result.error.code) {
        case "messaging/invalid-registration-token":
        case "messaging/registration-token-not-registered":
          invalidTokens.push(admin.firestore().collection('tokens').doc(tokensWithKey[i].key).delete() );
          break;
        default:
          break;
      }
    });

    return Promise.all(invalidTokens);
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
        content: 'Added a new CDS project',
        title: `${project.title}`,
        user: `${project.authorFullName} `,
        image: `${project.picture}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
});

exports.advertCreated = functions.firestore
.document('/adverts/{advert}')
.onUpdate((change, context) => {
  // Get an object representing the document
  const newValue = change.after.data();
  // ...or the previous value before this update
  const previousValue = change.before.data();
  // access a particular field 
  const approval = newValue.approved;
  // perform desired operations ...
  if(approval == true){
    const notification ={
        content:`${newValue.product}`,
        title: `${newValue.action}`,
        user: `${newValue.displayName}`,
        image: `${newValue.picture}`,
        time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification)
  }else{
    return;
  }
});

exports.advertDeleted = functions.firestore
.document('/adverts/{advert}')
.onDelete((snap, context) => {
  
  const deletedValue = snap.data();
  
  // perform desired operations ...
  if(deletedValue.userToken !== 'unsubscribed'){
    const payload = {
      notification: {
        title: `Your product: ${deletedValue.product}`,
        body: `${deletedValue.disapproval}`,
        icon: 'image/favicon.ico',
        badge: 'image/notify.png',
        image: `${deletedValue.picture}`,
        click_action: `http://ibomkopacds.netlify.com/`
      }
    }
    const tokensWithKey = [];
        tokensWithKey.push({
          token: deletedValue.userToken,
          key: deletedValue.id
        }); 

    return admin.messaging().sendToDevice(deletedValue.userToken, payload)
    .then((response) => cleanInvalidTokens(tokensWithKey, response.results))
    .catch(error=>console.log(error)
    )  }else{
    return;
  }
});

exports.notify = functions.firestore.document('/notifications/{notification}')
.onCreate(doc=>{

  // Setup notification
  const NOTIFICATION_SNAPSHOT = doc.data();
  console.log(NOTIFICATION_SNAPSHOT);
  const payload = {
    notification: {
      title: `${NOTIFICATION_SNAPSHOT.user} ${NOTIFICATION_SNAPSHOT.content}`,
      body: `${NOTIFICATION_SNAPSHOT.title}`,
      icon: 'image/favicon.ico',
      badge: 'image/notify.png',
      image: `${NOTIFICATION_SNAPSHOT.image}`,
      click_action: `http://ibomkopacds.netlify.com/`
    }
  }



return admin.firestore().collection('tokens').get().then((querySnapshot) => {
  if ( !querySnapshot) return;
  const tokensWithKey = [];
  const tokens = [];
  querySnapshot.forEach(function (doc) {
    tokens.push( doc.data().token );
      tokensWithKey.push({
        token: doc.data().token,
        key: doc.id
      });
});
  return admin.messaging().sendToDevice(tokens, payload)
    .then((response) => cleanInvalidTokens(tokensWithKey, response.results))
    .catch(error=>console.log(error)
    )
});

});


