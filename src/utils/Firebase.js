import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAS4MqgGiCQs5sSuyG7CS1TyJBv2aqLYXQ",
    authDomain: "ejecutivos-jul1.firebaseapp.com",
    databaseURL: "https://ejecutivos-jul1.firebaseio.com",
    projectId: "ejecutivos-jul1",
    storageBucket: "ejecutivos-jul1.appspot.com",
    messagingSenderId: "1082117378569",
    appId: "1:1082117378569:web:4fc329f91ccf625de15ed8",
    measurementId: "G-KZWZL1S21N"
  };

export default firebase.initializeApp(firebaseConfig)


