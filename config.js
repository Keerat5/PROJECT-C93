import * as firebase from 'firebase'
require('@firebase/firestore')

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAx95MZ21-qwe5scpnFbK3Wnk4WeG3EEp0",
    authDomain: "todoapp-74c7c.firebaseapp.com",
    projectId: "todoapp-74c7c",
    storageBucket: "todoapp-74c7c.appspot.com",
    messagingSenderId: "722589474230",
    appId: "1:722589474230:web:7b061faf8db272ae46f517"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
