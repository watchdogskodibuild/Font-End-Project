import styles from './admin-page.module.css';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { PenLine, BookOpenText, GraduationCap } from 'lucide-react';
import { FileText } from 'lucide-react';
import { UserContext } from '../app/app';
import { useContext, useEffect, useState } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";

export function AdminPage() {
  
  const [isAdmin, setisAdmin] = useState(false);
  const navigate = useNavigate();
  var user = useContext(UserContext);
  const adminEmails = ["elayf01@gmail.com"];

  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      } else {
        setisAdmin(adminEmails.includes(user.email));
      }
  }, [user]);

  return (<div className={styles.mainSection}>
    <section className={styles.welcomeSection}>          
      <h1 className={styles.heroTitle}>ברוכים הבאים לפורטל המנהל</h1>
          <p className={styles.heroDescription}> 
            {isAdmin ? "בדף זה תוכל להוסיף תבניות חדשות לכתיבת מסמכים" : "אינך מנהל ועל כן אינך נגיש לאפשרויות בדף זה"}
          </p>
    </section>
  </div>);
} 