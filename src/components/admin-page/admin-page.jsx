import styles from './admin-page.module.css';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import { PenLine, BookOpenText, GraduationCap, Briefcase } from 'lucide-react';
import { FileText } from 'lucide-react';
import { admins, templateTypes, UserContext } from '../app/app';
import { useContext, useEffect, useState } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { AddTemplateCard } from '../add-template-card/add-template-card';
import { TemplateUsedChart } from '../templates-used-chart/templates-used-chart';
import { UsersWithMostDocumentsPie } from '../user-with-most-documents/user-with-most-documents';

export function AdminPage({isAdmin}) {
  const navigate = useNavigate();
  var user = useContext(UserContext);


  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      } else {
        if(!isAdmin) {
          navigate("/");
        }
      }
  }, [user]);

  return (<div className={styles.mainSection}>
    <section className={styles.welcomeSection}>          
      <h1 className={styles.heroTitle}>ברוכים הבאים לפורטל המנהל</h1>
          <p className={styles.heroDescription}> 
            {isAdmin ? "בדף זה תוכל להוסיף תבניות חדשות לכתיבת מסמכים ולצפות בסטטוס האתר" : "אינך מנהל ועל כן אינך נגיש לאפשרויות בדף זה"}
          </p>
    </section>
    {isAdmin && <div className={styles.mainSection}>
    <section className={styles.addTemplateSection}>
      <p className="text-xl">הוספת תבנית חדשה</p>
    <div className="row justify-between">
      <AddTemplateCard title="תבנית ללימודים" icon={GraduationCap} templateType={templateTypes.study}></AddTemplateCard>
      <AddTemplateCard title="תבנית משרדית" icon={Briefcase} templateType={templateTypes.work}></AddTemplateCard>
      <AddTemplateCard title="תבנית אישית" icon={PenLine} templateType={templateTypes.personal}></AddTemplateCard>
    </div>
    </section>
    <section className="width-90-percent row">
      <TemplateUsedChart></TemplateUsedChart>
      <UsersWithMostDocumentsPie></UsersWithMostDocumentsPie>
    </section>
    </div>}
    
  </div>);
} 