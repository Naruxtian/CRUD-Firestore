import firebase from "firebase/app";
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBPRYZit9t6SuVlobKH-cHR8VPmFRaJyNI",
  authDomain: "crud-react-e6490.firebaseapp.com",
  projectId: "crud-react-e6490",
  storageBucket: "crud-react-e6490.appspot.com",
  messagingSenderId: "865921592245",
  appId: "1:865921592245:web:70d39582ab7ff0949147fc",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export{firebase}