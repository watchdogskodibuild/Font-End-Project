import { Routes, Route } from "react-router-dom";
import { TopBar } from "@/components/top-bar/top-bar";
import { Home as HomePage } from "@/components/home/home";
import { About as AboutPage } from "@/components/about/about";
import { Profile as ContactPage } from "@/components/profile/profile";
import {Login} from "@/components/login/login";
import { NoMatch } from "@/components/not-found/not-found";
import { onAuthStateChanged } from "firebase/auth";
import { useState, createContext, useEffect } from "react";
import '@/styles/main.css';
import { SideBar } from "../side-bar/side-bar";
import { Signup } from "../signup/signup";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {first, isNil, template} from "lodash";
import { addDoc, collection, getDoc, getDocs, getFirestore, query, where, doc, updateDoc } from "firebase/firestore";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from "@emotion/react";
import { Briefcase, GraduationCap, FileText, PenLine } from "lucide-react";
import { Templates } from "../templates/templates";
import { Editor } from "../editor/editor";
import { MyDocuments } from "../my-documents/my-documents";
import { AdminPage } from "../admin-page/admin-page";
import { TemplateCreator } from "../template-creator/template-creator";
import { updateProfile } from "firebase/auth";
import { SettingsPage } from "../settings/settings";
document.documentElement.style.overflow = 'auto';
document.body.style.overflow = 'auto';

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
const documentsTable = collection(db, "userDocuments");
const templatesTable = collection(db, "templates");

export const templateTypes = {
    work: 1,
    study: 2,
    personal: 3
};

export const getIconForTemplateType = (type) => {
  switch(type) {
    case templateTypes.study: 
      return GraduationCap;
    case templateTypes.work: 
      return Briefcase;
    case templateTypes.personal: 
      return PenLine;
  }
}

export const getAllTemplates = async () => {
  return (await getDocs(query(templatesTable))).docs;
};


export const getDocumentsCountPerType = async () => {
  const docsPerType =[0, 0, 0];
  const docs = (await getDocs(query(documentsTable))).docs;
  const allTemplates = await getAllTemplates();
  docs.forEach(doc => {
    if(isNil(doc.data().templateId)) {
      return;
    }
    const template = allTemplates.filter(t => t.id === doc.data().templateId)[0];
    docsPerType[template.data().templateType - 1] ++;
  });
  return docsPerType;
} 

export const getTemplateById = async (id) => {
  const documentRef = doc(db, "templates", id);
  return await getDoc(documentRef);
};

export const getDocumentsForUser = async (user) => {
  return (await getDocs(query(documentsTable, where("userEmail", "==", user.email)))).docs;
};

export const addDocumentsForUser = async (content, title, description, templateId, user) => {
  return await addDoc(documentsTable, {userEmail: user.email, templateId, content, title, description});
};

export const updateDocument = async (content, title, description, documentId) => {
  const documentRef = doc(db, "userDocuments", documentId);
  return await updateDoc(documentRef, {content: content, title, description});
};

export const getDocument = async (documentId) => {
  const documentRef = doc(db, "userDocuments", documentId);
  return await getDoc(documentRef);
};

export const addTemplate = async (templateType, name, description,content) => {
  return await addDoc(templatesTable, {templateType, name, description, content});
}

export const getDocumentsPerUserCount = async () => {
  const numberOfDocumentsForUser = {};
  const docs = (await getDocs(query(documentsTable))).docs;
  docs.forEach(doc => {
    const email = doc.data().userEmail;
    if(email) {
      numberOfDocumentsForUser[email] = (numberOfDocumentsForUser[email] || 0) + 1;
    }
  }
  );
  return numberOfDocumentsForUser;
}


/******* Authentication *******/
const auth = getAuth(firebaseApp);
export const AuthContext = createContext(auth); 
export const UserContext = createContext(null); 
export const admins = ["elayf00@gmail.com", "itayhw96@gmail.com"];


 export const updateUserProfile = async (name) => {
  if (auth.currentUser) {
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  }
};

/*** setting context ***/
export const AutoSaveContext = createContext(false); 


export function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  

  const theme = createTheme({
    palette: {
      dark: {
          main: '#0F172A',
          contrastText: '#ffffff'
      },
      veryLightBackground: '#ffffff',
      lightBackground: '#ffffff',
      darkBackground: '#F9FAFB',
      darkText: '#000000',
      mediumDarkText: "#a8a8a8",
      light: {
        main: '#ffffff',
        contrastText: '#0F172A'
      }
      }});

  const darkTheme = createTheme({
    palette: {
      light: {
          main: '#0F172A',
          contrastText: '#ffffff'
        },
        veryLightBackground: '#242424',
        lightBackground: '#484848',
        darkBackground: '#363636',
        darkText: '#f0f0f0',
        mediumDarkText: "#a8a8a8",
        dark: {
          main: '#ffffff',
          contrastText: '#0F172A'
        }
      }});
  
  
  //detect auth state
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAdmin( !isNil(user) && admins.includes(user.email));
      setIsDarkMode(false);
      return subscribe;
   });
  }, [])

  return (<>
  <ThemeProvider theme={isDarkMode ? darkTheme : theme}>
  <UserContext.Provider value={currentUser}> 
    <AutoSaveContext.Provider value={autoSave}>
    <div dir="rtl">
      <SideBar> 
      </SideBar>  
      <TopBar isAdmin={isAdmin}>
      </TopBar>
      <div className="mainRoute" style={{backgroundColor: isDarkMode ? darkTheme.palette.veryLightBackground : theme.palette.veryLightBackground}} id="mainPart">
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
        <Route path="/admin" element={<AdminPage isAdmin={isAdmin}/>} />
        <Route path="/settings" element={<SettingsPage setAutoSave={setAutoSave} setIsDarkMode={setIsDarkMode} isDarkMode={isDarkMode} />} />
        <Route path="/addTemplate" element={<TemplateCreator />} />
      </Routes>
      </div>
    </div>
    </AutoSaveContext.Provider>
    </UserContext.Provider>
    </ThemeProvider>
  </>
);
}; 