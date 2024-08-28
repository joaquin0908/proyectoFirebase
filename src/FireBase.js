import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyA68XRopRYjybHE0qNSBVEtdT5O_Lxvy0I",
  authDomain: "react-2024-f1ebe.firebaseapp.com",
  projectId: "react-2024-f1ebe",
  storageBucket: "react-2024-f1ebe.appspot.com",
  messagingSenderId: "634957183686",
  appId: "1:634957183686:web:25dbceff025450d25d35c7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db};