import styles from './settings.module.css';
import { Button, Card, CardContent, CardHeader, Switch } from '@mui/material';
import { PenLine, BookOpenText, GraduationCap, Briefcase } from 'lucide-react';
import { FileText } from 'lucide-react';
import { admins, AutoSaveContext, templateTypes, UserContext } from '../app/app';
import { useContext, useEffect, useState } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { AddTemplateCard } from '../add-template-card/add-template-card';
import { TemplateUsedChart } from '../templates-used-chart/templates-used-chart';
import { UsersWithMostDocumentsPie } from '../user-with-most-documents/user-with-most-documents';
import { CustomCard } from '../card/card';

export function SettingsPage({setAutoSave, setIsDarkMode, isDarkMode}) {
  const navigate = useNavigate();
  var user = useContext(UserContext);
  var autoSave = useContext(AutoSaveContext);

  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      }
  }, [user]);

  return (<div className={styles.mainSection}>
    <CustomCard title="הגדרות" className={styles.settingsSection}>
      <CardContent>
        {!isNil(autoSave) && ( 
        <div className="row width-90-percent justify-between">
          <div className="column">
          <p className='text-md'>שמירה אוטומטית</p>
          <p className='text-sm text-thin'>שמירה אוטומטית למסמכים כל 5 דקות</p>
          </div> 
          <Switch checked={autoSave} onChange={() => setAutoSave(!autoSave)}></Switch>
        </div>)}
        <div className="row width-90-percent justify-between">
          <div className="column">
          <p className='text-md'>מצב כהה</p>
          <p className='text-sm text-thin'>תצוגה כהה לכלל האתר</p>
          </div> 
          <Switch checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)}></Switch>
        </div>
      </CardContent>
    </CustomCard>
    
    
  </div>);
} 