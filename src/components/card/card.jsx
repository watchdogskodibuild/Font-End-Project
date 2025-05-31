import { useEffect, useRef, useState, useContext } from "react";
import { Card, CardActions, CardHeader, useTheme,} from "@mui/material";
import { Save, Download, Share2, MoreHorizontal } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AutoSaveContext, getDocument, getTemplateById, updateDocument } from "../app/app";
import { addDocumentsForUser } from "../app/app";
import { UserContext } from '../app/app';

export function CustomCard({title, subTitle, className, actions, isContentLighter = false,children}) {
  const theme = useTheme();

  return (
    <Card className={className + " margin"} style={{backgroundColor: isContentLighter ? theme.palette.darkBackground : theme.palette.lightBackground}}>
        <CardHeader style={{color: theme.palette.darkText}} title={title} subheader={<div style={{color: theme.palette.darkText}}>{subTitle}</div>}></CardHeader>
        <div style={{color: theme.palette.mediumDarkText, backgroundColor: theme.palette.lightBackground}}>{children}</div>
        {actions &&
        <CardActions >
          {actions}
        </CardActions>}
    </Card>
  );
};