import { Card, CardContent, CardHeader, CardActions, Button} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./template-card.module.css";

export const TemplateCard = ({ title, icon: Icon, description, templateId, documentId }) => {
  const editorLink = templateId ? `/editor?template=${templateId}` : (documentId ? `/editor?documentId=${documentId}` : "/editor");
  const navigate = useNavigate();
  const useTemplate = () => {
    navigate(editorLink);
  }

  return (
    <Card className={styles.TemplateCard}>
      <CardHeader title={<div className="row justify-between">{title}<div className="icon-circle"><Icon/></div></div>}>
      </CardHeader>
      <CardContent className="bg-light height-40-percent">
        <p className="text-gray text-md">{description}</p>
      </CardContent>
      <CardActions className="border-gray-300 justify-end rtl ">
        <Button variant="contained" color="dark" onClick={useTemplate}>
            {documentId ? "ערוך" : "התחל כתיבה"}
        </Button>
      </CardActions>
    </Card>
  );
};