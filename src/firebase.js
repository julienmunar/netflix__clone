import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyD9Y1Lw8t923FVWn7Mcb4qehlrQjtBZCjM",
    authDomain: "netflix-clone-26753.firebaseapp.com",
    projectId: "netflix-clone-26753",
    storageBucket: "netflix-clone-26753.appspot.com",
    messagingSenderId: "149732370134",
    appId: "1:149732370134:web:1c7afd6d12de2d99fc8b77"
  };



const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app);

export {db,auth}