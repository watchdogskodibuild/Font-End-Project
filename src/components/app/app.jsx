import { Routes, Route } from "react-router-dom";
import { TopBar } from "@/components/top-bar/top-bar";
// content pages
import { Home as HomePage } from "@/components/home/home";
import { About as AboutPage } from "@/components/about/about";
import { Profile as ContactPage } from "@/components/profile/profile";
import {Login} from "@/components/login/login";
import { NoMatch } from "@/components/not-found/not-found";
import { onAuthStateChanged } from "firebase/auth";
import { useState, createContext } from "react";
import '@/styles/main.css';
// navigation
import { SideBar } from "../side-bar/side-bar";
import { Signup } from "../signup/signup";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {isNil} from "lodash";
import { getFirestore } from "firebase/firestore";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";

theme = createTheme(theme, {
  // Custom colors created with augmentColor go here
  palette: {
    dark: theme.palette.augmentColor({
      color: {
        main: '#0F172A',
      },
      name: 'dark',
    }),
  },
});

// import { PrivateRoute } from "../PrivateRoute/private-route";
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
export const UserContext = createContext(null);

export function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // //detect auth state
  onAuthStateChanged(auth, user => {
      setCurrentUser(user);
       if(!isNil(user)) {
           console.log("logged in!");
       } else {
           console.log("logged out :(");
       }
   });

  return (<>
    <ThemeProvider theme={theme}>
  <UserContext.Provider value={currentUser}> 
    <div dir="rtl">
      <TopBar>
      </TopBar>
      <SideBar> 
      </SideBar>  
      <div className="mainRoute">
        <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      
      </Routes>
      </div>
    </div>
    </UserContext.Provider>
    </ThemeProvider>
  
  </>
);
}; 