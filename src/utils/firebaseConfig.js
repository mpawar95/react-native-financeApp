import firebase from 'react-native-firebase';
 let config = {
    apiKey: "firebase api key",
    authDomain: "",
    databaseURL: "firebase database url",
    projectId: "firebase project id",
    storageBucket: "",
    messagingSenderId: ""
  };
let app = firebase.initializeApp(config);
export const db = app.database();
