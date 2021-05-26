import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCwWMeUHmxqXuemlLb7TD-p1sKAYyM6mlc",
    authDomain: "grweapons.firebaseapp.com",
    projectId: "grweapons",
    storageBucket: "grweapons.appspot.com",
    messagingSenderId: "974962772663",
    appId: "1:974962772663:web:164b57a19ba3fc09819b32",
    measurementId: "G-9P13JS74LC"
};

firebase.initializeApp(firebaseConfig);

export default firebase;