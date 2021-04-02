import firebase from 'firebase'



const firebaseConfig = {
    apiKey: "AIzaSyAHTo0rhQoWWid7zfqylnYa12nwJ3Dakxo",
    authDomain: "clone-jdan1.firebaseapp.com",
    projectId: "clone-jdan1",
    storageBucket: "clone-jdan1.appspot.com",
    messagingSenderId: "1020192592497",
    appId: "1:1020192592497:web:f143a336015094d1a381d0"
  };


const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()

const auth = firebase.auth()



export { db, auth}