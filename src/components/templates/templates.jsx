import styles from './templates.module.css';
import { getAllTemplates, getIconForTemplateType, UserContext } from '../app/app';
import { useContext, useEffect, useState } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from '../template-card/template-card';

export function Templates() {
  const [templates, setTemplates] = useState([]);

  var user = useContext(UserContext);
  var navigate = useNavigate();
  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
      } else {
            getAllTemplates().then(t => {
              setTemplates(t); 
          })}
  }, [user]);

  return (<div className={styles.mainSection}>
    {templates.map(template => <TemplateCard key={template.id} title={template.data().name} description={template.data().description} icon={getIconForTemplateType(template.data().templateType)} templateId={template.id}></TemplateCard>)}    
  </div>);
} 