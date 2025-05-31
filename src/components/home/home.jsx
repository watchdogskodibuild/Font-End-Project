import styles from './home.module.css';
import { Button, CardContent } from '@mui/material';
import { PenLine, BookOpenText, GraduationCap } from 'lucide-react';
import { FileText } from 'lucide-react';
import { UserContext } from '../app/app';
import { useContext, useEffect } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@emotion/react';
import { CustomCard } from '../card/card';

export function Home() {
  const theme = useTheme();
  const navigate = useNavigate();
  var user = useContext(UserContext);
  
  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      }
  }, [user]);

  const onNavigateToTemplates = () => {
    navigate("/templates"); // Replace with your path
  };

  const onCreateNew = () => {
    navigate("/editor"); // Replace with your path
  };

  const FeatureCard = ({ title, description, icon: Icon }) => {
  return (
    <CustomCard className={styles.featureCard} title={<div className={styles.featureCardHeader}><Icon /> {title}</div>}>
      <CardContent className="text-md">{description}</CardContent>
    </CustomCard>
  );
};
  

  return (<div className={styles.mainSection}>
    <section className={styles.welcomeSection}>          
      <h1 className={styles.heroTitle}>ברוכים הבאים ל-Easy2Write</h1>
          <p className={styles.heroDescription}> 
            פלטפורמה לסטודנטים המספקת תבניות וכלים לכתיבה אקדמית, קורות חיים ועוד
          </p>
          <div className="row full-width justify-center">
          <div className={styles.buttonsContainer}>
            <Button color="dark"  variant='contained' size='large' onClick={onNavigateToTemplates}>
            <FileText className="ml-2 h-5 w-5" />
              עיון בתבניות
            </Button>
            <Button  color="light" variant='contained' size='large' onClick={onCreateNew}>
                <PenLine className="ml-2 h-5 w-5" />
                התחלת עבודה חדשה
            </Button>
          </div>
          </div>
    </section>
     <section className={styles.featuresGrid}>
          <FeatureCard 
            title="תבניות מקצועיות" 
            description="מגוון תבניות לעבודות אקדמיות, קורות חיים, ומסמכים נוספים"
            icon={BookOpenText}
          />
          <FeatureCard 
            title="סביבת עריכה נוחה" 
            description="עורך טקסט חכם עם כלים מתקדמים לעיצוב ועריכת תוכן"
            icon={PenLine}
          />
          <FeatureCard 
            title="כלים לסטודנטים" 
            description="פתרונות ייעודיים לצרכי כתיבה אקדמית וציטוט מקורות"
            icon={GraduationCap}
          />
      </section>
  </div>);
} 