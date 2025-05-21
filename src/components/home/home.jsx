import styles from './home.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import { FileText } from 'lucide-react';

export function Home() {

  const onNavigateToTemplates = () => {
    console.log("hi");
    navigate("/templates"); // Replace with your path
  };

  const onCreateNew = () => {
    navigate("/editor"); // Replace with your path
  };


  return (<div className={styles.mainSection}>
    <section className={styles.welcomeSection}>          
      <h1 className={styles.heroTitle}>ברוכים הבאים ל-Easy2Write</h1>
          <p className={styles.heroDescription}> 
            פלטפורמה לסטודנטים המספקת תבניות וכלים לכתיבה אקדמית, קורות חיים ועוד
          </p>
          <div className={styles.buttonContainer}>
            <Button color="secondary"  onClick={onNavigateToTemplates}>
            <FileText className="ml-2 h-5 w-5" />
              עיון בתבניות
            </Button>
            <Button color="secondary" onClick={onCreateNew}>
                <PenLine className="ml-2 h-5 w-5" />
                התחלת עבודה חדשה
            </Button>
          </div>
    </section>
  </div>);
} 