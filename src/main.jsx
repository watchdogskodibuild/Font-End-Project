import ReactDOMClient from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { App } from '@/components/app/app'
import '@/styles/main.css';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {isNil} from "lodash";
import { getFirestore } from "firebase/firestore";
import { createContext } from 'react';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
) 

6