import styles from './home.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import { FileText } from 'lucide-react';
import { UserContext } from '../app/app';
import { useContext, useEffect } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from '../template-card/template-card';

export function Home() {
  
  const navigate = useNavigate();
  var user = useContext(UserContext);

  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      }
  }, [user]);

  const onNavigateToTemplates = () => {
    console.log("hi");
    navigate("/templates"); // Replace with your path
  };

  const onCreateNew = () => {
    navigate("/editor"); // Replace with your path
  };
  

  return (<div className={styles.mainSection}>
    <section className={styles.welcomeSection}>          
      <h1 className={styles.heroTitle}>ברוכים הבאים ל-Easy2Write {user ? user.email: ''}</h1>
          <p className={styles.heroDescription}> 
            פלטפורמה לסטודנטים המספקת תבניות וכלים לכתיבה אקדמית, קורות חיים ועוד
          </p>
          <div className={styles.buttonContainer}>
            <Button color="secondary"   onClick={onNavigateToTemplates}>
            <FileText className="ml-2 h-5 w-5" />
              עיון בתבניות
            </Button>
            <Button color="secondary" onClick={onCreateNew}>
                <PenLine className="ml-2 h-5 w-5" />
                התחלת עבודה חדשה
            </Button>
          </div>
    </section>
    
          {/* <TemplateCard title="hi" icon={PenLine}></TemplateCard> */}
  </div>);
} 