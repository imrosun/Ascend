import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA-H6M4ofs405OeveIpQgH6oJYpRRVT4VA",
  authDomain: "authentication-bd82d.firebaseapp.com",
  projectId: "authentication-bd82d",
  storageBucket: "authentication-bd82d.appspot.com",
  messagingSenderId: "278021781082",
  appId: "1:278021781082:web:139e84901f4ac6da744a63",
  measurementId: "G-C08Y5RH89K",
  };

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };