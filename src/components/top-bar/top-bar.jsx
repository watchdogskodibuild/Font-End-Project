import { useContext } from 'react';
import styles from './top-bar.module.css';
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext, UserContext } from '../app/app';
import { Button } from '@mui/material';
import { isNil } from 'lodash';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

export function TopBar({ isAdmin }) {
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
    let currentTitle = "";
    switch (location.pathname) {
      case "/":
        currentTitle = "דף הבית";
        break;
      case "/templates":
        currentTitle = "תבניות";
        break;
      case "/documents":
        currentTitle = "המסמכים שלי";
        break;
      case "/settings":
        currentTitle = "הגדרות";
        break;
      case "/profile":
        currentTitle = "פרופיל";
        break;
      case "/admin":
        currentTitle = "פורטל המנהל";
        break;
      case "/login":
        currentTitle = "כניסה";
        break;      
      case "/signup":
        currentTitle = "הרשמה";
        break;
      default:
        currentTitle = "";
        break;
    }
    document.title = currentTitle;
    return currentTitle;
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.logo}>
          <Link to="/">
          <img src="./icons/logo.png" alt="Easy2Write Logo"/>
          </Link>
      </div>
    <div className={styles.container}>
      
      <h1 className={styles.title}>{getPageTitle()}</h1>
      <div className="row justify-end full-width">
        {!isNil(user) && isAdmin && <Button className="margin-left action-button" color='light' variant="contained" size='large' onClick={goToAdminPage}>פורטל מנהל</Button>}        
        {!isNil(user) && <Button className="action-button" color='light' variant="contained" size='large' onClick={disconnectUser}>התנתק</Button>}
        </div>
      </div>
    </div>
  );
} 