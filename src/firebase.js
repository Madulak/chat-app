import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCbbJNLtJhdXix6_sHe4LdvSEOL-qYmHZI",
    authDomain: "chat-app-f3d24.firebaseapp.com",
    databaseURL: "https://chat-app-f3d24.firebaseio.com",
    projectId: "chat-app-f3d24",
    storageBucket: "chat-app-f3d24.appspot.com",
    messagingSenderId: "184694901004",
    appId: "1:184694901004:web:d5f145a1714cd6d90ca129",
    measurementId: "G-YD4W49WHVW"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export  { auth, provider } ;
export default db;