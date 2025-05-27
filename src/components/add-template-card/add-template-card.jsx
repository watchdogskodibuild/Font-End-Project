import { useEffect, useRef, useState, useContext, use } from "react";
import { Button, Input, Tab, Tabs, Box, Card, InputLabel, FormControl, TextField, duration, CardHeader, CardContent, ThemeProvider, CardActions} from "@mui/material";
import { Save, Download, Share2, MoreHorizontal, Plus } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getDocument, getTemplateById, updateDocument } from "../app/app";
import { UserContext, admins, addDocumentsForUser, addTemplate } from '../app/app';
import styles from "./add-template-card.module.css";

export function AddTemplateCard({icon: Icon, title, templateType}) {

  const navigate = useNavigate();

    const onAdd = () => {
        navigate(`/addTemplate?templateType=${templateType}`);
    }


  return (
    <Card className={styles.addTemplateCard} >
        <CardHeader title={<div className={styles.cardHeader}><div className="icon-circle"><Icon /></div> {title}</div>}>
        </CardHeader>
        <CardActions className={styles.cardActions}>
           <Button color="dark" variant="contained" onClick={onAdd}><Plus/> Add</Button> 
        </CardActions>
    </Card>
  );
};