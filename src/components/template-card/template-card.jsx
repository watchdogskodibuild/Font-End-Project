import { Card, CardContent, CardHeader, CardActions, Button} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./template-card.module.css";
import { CustomCard } from "../card/card";

export const TemplateCard = ({ title, icon: Icon, description, templateId, documentId }) => {
  const editorLink = templateId ? `/editor?template=${templateId}` : (documentId ? `/editor?documentId=${documentId}` : "/editor");
  const navigate = useNavigate();
  const useTemplate = () => {
    navigate(editorLink);
  }

  return (
    <CustomCard className={styles.TemplateCard} isContentLighter={true} title={<div className="row justify-between">{title}<div className="icon-circle"><Icon/></div></div>} actions={<Button variant="contained" color="dark" onClick={useTemplate}>{documentId ? "ערוך" : "התחל כתיבה"}</Button>}>
      <CardContent className="height-40-percent">
        <p className="text-md">{description}</p>
      </CardContent>
    </CustomCard>
  );
};