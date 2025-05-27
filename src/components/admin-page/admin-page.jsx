import styles from './admin-page.module.css';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { PenLine, BookOpenText, GraduationCap, Briefcase } from 'lucide-react';
import { FileText } from 'lucide-react';
import { admins, templateTypes, UserContext } from '../app/app';
import { useContext, useEffect, useState } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { AddTemplateCard } from '../add-template-card/add-template-card';

export function AdminPage() {
  
  const [isAdmin, setisAdmin] = useState(false);
  const navigate = useNavigate();
  var user = useContext(UserContext);


  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      } else {
        setisAdmin(admins.includes(user.email));
      }
  }, [user]);

  return (<div className={styles.mainSection}>
    <section className={styles.welcomeSection}>          
      <h1 className={styles.heroTitle}>ברוכים הבאים לפורטל המנהל</h1>
          <p className={styles.heroDescription}> 
            {isAdmin ? "בדף זה תוכל להוסיף תבניות חדשות לכתיבת מסמכים" : "אינך מנהל ועל כן אינך נגיש לאפשרויות בדף זה"}
          </p>
    </section>
    <section className={styles.addTemplateSection}>
      <p className="text-xl">הוספת תבנית חדשה</p>
    <div className="row">
      <AddTemplateCard title="תבנית ללימודים" icon={GraduationCap} templateType={templateTypes.study}></AddTemplateCard>
      <AddTemplateCard title="תבנית משרדית" icon={Briefcase} templateType={templateTypes.work}></AddTemplateCard>
      <AddTemplateCard title="תבנית אישית" icon={PenLine} templateType={templateTypes.personal}></AddTemplateCard>
    </div>
    </section>
    
  </div>);
} 