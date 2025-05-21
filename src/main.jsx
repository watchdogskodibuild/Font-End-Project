import ReactDOMClient from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/components/app/app'
import '@/styles/main.css';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {isNil} from "lodash";
import { getFirestore } from "firebase/firestore";
import { createContext } from 'react';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDrJPKOEPB9_Drkp-cUWTi_G2siBLXTwbg",
  authDomain: "final-fe-project.firebaseapp.com",
  projectId: "final-fe-project",
  storageBucket: "final-fe-project.firebasestorage.app",
  messagingSenderId: "928232401211",
  appId: "1:928232401211:web:0dfdac6952ded9e6f9ef1e",
  measurementId: "G-XHZFJMZMJ9"
});
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export const AuthContext = createContext(auth); // <-- export this directly
//detect auth state

onAuthStateChanged(auth, user => {
    if(!isNil(user)) {
        console.log("logged in!");
    } else {
        console.log("logged out :(");
    }
});



const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
) 

6