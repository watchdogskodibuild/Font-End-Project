import { Button, CardActions} from "@mui/material";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import styles from "./add-template-card.module.css";
import { CustomCard } from "../card/card";

export function AddTemplateCard({icon: Icon, title, templateType}) {

  const navigate = useNavigate();

    const onAdd = () => {
        navigate(`/addTemplate?templateType=${templateType}`);
    }

  return (
    <CustomCard className={styles.addTemplateCard} title={<div className={styles.cardHeader}><div className="icon-circle"><Icon /></div> {title}</div>}>
        <CardActions className={styles.cardActions}>
           <Button color="dark" variant="contained" onClick={onAdd}><Plus/> Add</Button> 
        </CardActions>
    </CustomCard>
  );
};