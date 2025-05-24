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
import { addDoc, collection, getDoc, getDocs, getFirestore, query, where, doc, updateDoc } from "firebase/firestore";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
import { Briefcase, GraduationCap, FileText, PenLine } from "lucide-react";
import { Templates } from "../templates/templates";
import { Editor } from "../editor/editor";
import { MyDocuments } from "../my-documents/my-documents";
import { AdminPage } from "../admin-page/admin-page";
document.documentElement.style.overflow = 'auto'; // For the entire document
document.body.style.overflow = 'auto'; // For the body of the document

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDrJPKOEPB9_Drkp-cUWTi_G2siBLXTwbg",
  authDomain: "final-fe-project.firebaseapp.com",
  projectId: "final-fe-project",
  storageBucket: "final-fe-project.firebasestorage.app",
  messagingSenderId: "928232401211",
  appId: "1:928232401211:web:0dfdac6952ded9e6f9ef1e",
  measurementId: "G-XHZFJMZMJ9"
});
/******* DB Access *******/
const db = getFirestore(firebaseApp);
const usersTable = collection(db, "userDocuments");
const templatesTable = collection(db, "templates");

const templateType = {
    work: 1,
    study: 2,
    personal: 3
};

export const getIconForTemplateType = (type) => {
  switch(type) {
    case templateType.study: 
      return GraduationCap;
    case templateType.work: 
      return Briefcase;
    case templateType.personal: 
      return PenLine;
  }
}

export const getAllTemplates = async () => {
  return (await getDocs(query(templatesTable))).docs;
};

export const getTemplateById = async (id) => {
    const documentRef = doc(db, "templates", id);
  return await getDoc(documentRef);
};

export const getDocumentsForUser = async (user) => {
  return (await getDocs(query(usersTable, where("userEmail", "==", user.email)))).docs;
};

export const addDocumentsForUser = async (content, title, description, templateId, user) => {
  return await addDoc(usersTable, {userEmail: user.email, templateId, content, title, description});
};

export const updateDocument = async (content, title, description, documentId) => {
  const documentRef = doc(db, "userDocuments", documentId);
  return await updateDoc(documentRef, {content: content, title, description});
};

export const getDocument = async (documentId) => {
  const documentRef = doc(db, "userDocuments", documentId);
  return await getDoc(documentRef);
};


/******* Authentication *******/
const auth = getAuth(firebaseApp);
export const AuthContext = createContext(auth); 
export const UserContext = createContext(null);


export function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const theme = createTheme({
    palette: {
      dark: {
          main: '#0F172A',
          contrastText: '#ffffff'
        },
        light: {
          main: '#ffffff',
          contrastText: '#0F172A'
        }
      }});

  // //detect auth state
  onAuthStateChanged(auth, user => {
      setCurrentUser(user);
   });

  return (<>
    <ThemeProvider theme={theme}>
  <UserContext.Provider value={currentUser}> 
    <div dir="rtl">
      <TopBar>
      </TopBar>
      <SideBar> 
      </SideBar>  
      <div className="mainRoute" id="mainPart">
        <Routes>
        <Route path="*" element={<NoMatch />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/documents" element={<MyDocuments />} />
        <Route path="/settings" element={<AdminPage />} />
      </Routes>
      </div>
    </div>
    </UserContext.Provider>
    </ThemeProvider>
  
  </>
);
}; 