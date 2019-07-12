import firebase from 'react-native-firebase';
 let config = {
    apiKey: "AIzaSyA-vUKW2grdxXnkRK5VGgqwekcVCl3dMy8",
    authDomain: "",
    databaseURL: "https://perify-ebc9a.firebaseio.com/",
    projectId: "perify-ebc9a",
    storageBucket: "",
    messagingSenderId: ""
  };
let app = firebase.initializeApp(config);
export const db = app.database();