importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDY6XCDg3p1C5d67K47hFrzkZCsHpOXnOk",
  authDomain: "ibomcds.firebaseapp.com",
  databaseURL: "https://ibomcds.firebaseio.com",
  projectId: "ibomcds",
  storageBucket: "ibomcds.appspot.com",
    messagingSenderId: "1037860293622"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('Handling background message ', payload);

  return self.registration.showNotification(payload.data.title,
    Object.assign({
    body: payload.data.body,
    icon: payload.data.icon,
    image:payload.data.image,
    badge: payload.data.badge,
    requireInteraction: true,
    silent: false,
    vibrate: [200, 100, 200],
    click_action: payload.data.click_action,
    data: payload.data
  },payload.data) );
});

// self.addEventListener('notificationclick', function(event) {
//   event.notification.close();
//   event.waitUntil(self.clients.openWindow(event.notification.data));
// });
self.addEventListener('notificationclick', e => {
  let found = false;
  let f = clients.matchAll({
      includeUncontrolled: true,
      type: 'window'
  })
      .then(function (clientList) {
          for (let i = 0; i < clientList.length; i ++) {
              if (clientList[i].url === e.notification.data.click_action) {
                  // We already have a window to use, focus it.
                  found = true;
                  clientList[i].focus();
                  break;
              }
          }
          if (! found) {
              clients.openWindow(e.notification.data.click_action).then(function (windowClient) {});
          }
      });
  e.notification.close();
  e.waitUntil(f);
});
