import styles from './my-documents.module.css';
import { getDocumentsForUser, UserContext } from '../app/app';
import { useContext, useEffect, useState } from 'react';
import {isNil} from "lodash";
import { useNavigate } from "react-router-dom";
import { TemplateCard } from '../template-card/template-card';
import { FilePen } from 'lucide-react';

export function MyDocuments() {
  var user = useContext(UserContext);
  const [documents, setDocuments] = useState();
  
  var navigate = useNavigate();
  useEffect(() => {
    if(isNil(user)) {
      navigate("/login");
    } else {
      getDocumentsForUser(user).then(docs => {
        setDocuments(docs); 
      })
    }
  }, [user]);

  return (<div className={styles.mainSection}>
    {documents && documents.map(document => <TemplateCard key={document.id} title={document.data().title} description={document.data().description} icon={FilePen} documentId={document.id}></TemplateCard>)}
  </div>);
} 