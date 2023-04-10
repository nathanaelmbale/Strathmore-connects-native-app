const { initializeApp } = require("firebase/app");
const { getStorage } = require('firebase/storage');

const firebaseConfig = {
    apiKey: "AIzaSyAxtzoJ7wztlSzpcYBC35BR3sy__aaXtOw",
    authDomain: "strathmore-connects.firebaseapp.com",
    projectId: "strathmore-connects",
    storageBucket: "strathmore-connects.appspot.com",
    messagingSenderId: "240269365746",
    appId: "1:240269365746:web:497479fbff02d740689b6b",
    measurementId: "G-6PWWSPLT67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = { firebaseConfig, storage };
