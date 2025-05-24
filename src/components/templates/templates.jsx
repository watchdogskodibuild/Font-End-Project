import styles from './templates.module.css';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import { FileText } from 'lucide-react';
import { UserContext } from '../app/app';
import { useContext, useEffect } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from '../template-card/template-card';
import { templates } from '../app/app';

export function Templates() {
  var user = useContext(UserContext);
  var navigate = useNavigate();

  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      }
  }, [user]);

  return (<div className={styles.mainSection}>
    {templates.map(template => <TemplateCard title={template.name} description={template.description} icon={template.icon} templateId={template.id}></TemplateCard>)}    
  </div>);
} 