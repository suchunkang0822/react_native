import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCymwfasOIduBIlff5Axu-U_II1SFH1mpA",
  authDomain: "find-research-studies.firebaseapp.com",
  databaseURL: "https://find-research-studies.firebaseio.com",
  projectId: "find-research-studies",
  storageBucket: "find-research-studies.appspot.com",
  messagingSenderId: "261332989508",
  appId: "1:261332989508:web:a4c08614fc8efad90bae11",
  measurementId: "G-SZ4EF3S9C4"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

export default db;