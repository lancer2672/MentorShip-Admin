importScripts("https://www.gstatic.com/firebasejs/7.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/7.0.0/firebase-messaging.js");

const firebaseConfig = {
  apiKey: "AIzaSyDj97XIjhTJXW4ZryS5yTmDSuRrPp0S3PU",
  authDomain: "ecommerce-97039.firebaseapp.com",
  databaseURL: "https://ecommerce-97039.firebaseio.com",
  projectId: "ecommerce-97039",
  storageBucket: "ecommerce-97039.appspot.com",
  messagingSenderId: "402432922814",
  appId: "1:402432922814:web:66d46f50250f8ed07a7aef",
};

firebase.initializeApp(firebaseConfig);
const msg = firebase.messaging();

msg.setBackgroundMessageHandler(function (payload) {
  let options = {
    body: payload.data.body,
    icon: payload.data.icon,
  };

  return self.registration.showNotification(payload.data.title, options);
});
