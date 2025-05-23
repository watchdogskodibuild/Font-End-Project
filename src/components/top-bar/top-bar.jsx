import { useContext } from 'react';
import styles from './top-bar.module.css';
import { useLocation } from "react-router-dom";
import { AuthContext, UserContext } from '../app/app';
import { Button } from '@mui/material';
import { isNil } from 'lodash';
import { signOut } from 'firebase/auth';

export function TopBar({ title }) {
  const user = useContext(UserContext);
  const location = useLocation();
  const auth = useContext(AuthContext);

  const disconnectUser = () => {
    signOut(auth);
  }
  
  const getPageTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case "/":
        return "דף הבית";
      case "/templates":
        return "תבניות";
      case "/documents":
        return "המסמכים שלי";
      case "/settings":
        return "פורטל המנהל";
      case "/profile":
        return "פרופיל";
      case "/admin-settings":
        return "הגדרות מנהל";
      case "/login":
        return "כניסה";      
      case "/signup":
        return "הרשמה";
      default:
        return "";
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{getPageTitle()}</h1>
      {!isNil(user) && <Button color='light' variant="contained" size='large' onClick={disconnectUser}>התנתק</Button>}    
    </div>
  );
} 