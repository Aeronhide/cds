import firebase from "firebase";

const config = {
  apiKey: "AIzaSyC5HWOVKxyw7wCqJXFdiuFqmLTczGcTknI",
  authDomain: "cds-402ef.firebaseapp.com",
  databaseURL: "https://cds-402ef.firebaseio.com",
  projectId: "cds-402ef",
  storageBucket: "cds-402ef.appspot.com",
  messagingSenderId: "886002389901",
  appId: "1:886002389901:web:2c72fdbf6e4b1e5838e3c4",
  measurementId: "G-RSMZWXSK0Q",
};

firebase.initializeApp(config);

export default firebase;
