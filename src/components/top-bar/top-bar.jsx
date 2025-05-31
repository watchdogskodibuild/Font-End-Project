import { useContext } from 'react';
import styles from './top-bar.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from '../app/app';
import { Button } from '@mui/material';
import { isNil } from 'lodash';
import { signOut } from 'firebase/auth';

export function TopBar({ title, isAdmin }) {
  const user = useContext(UserContext);
  const location = useLocation();
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const disconnectUser = () => {
    signOut(auth);
  }
  
  const goToAdminPage = () => {
    navigate("/admin")
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
      case "/admin":
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
      <div className="row justify-end full-width">
        {!isNil(user) && isAdmin && <Button className="margin-left action-button" color='light' variant="contained" size='large' onClick={goToAdminPage}>פורטל מנהל</Button>}        
        {!isNil(user) && <Button className="action-button" color='light' variant="contained" size='large' onClick={disconnectUser}>התנתק</Button>}
        </div>
      </div>
  );
} 