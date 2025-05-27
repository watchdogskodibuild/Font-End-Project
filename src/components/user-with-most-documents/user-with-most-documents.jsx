import { useEffect, useRef, useState, useContext } from "react";
import { Button, Card, CardContent, CardHeader, FormControl, TextField} from "@mui/material";
import { Save } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext, admins, addTemplate, templateTypes, getDocument, getDocumentsPerUserCount } from '../app/app';
import { isNumber, template } from "lodash";
import { getDocumentsCountPerType } from "../app/app";
import styles from "./user-with-most-documents.module.css";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function UsersWithMostDocumentsPie() {
  const [documentsPerUser, setDocumentsPerUser] = useState({});
  const [data, setData] = useState();
  useEffect(() => {
    getDocumentsPerUserCount().then(umDocsPerUser => setDocumentsPerUser(umDocsPerUser));
  }, []);

  useEffect(() => {
    console.log(documentsPerUser);
    setData({
    labels: Object.keys(documentsPerUser),
    datasets: [
        {
        label: 'כמות מסמכים',
        data: Object.values(documentsPerUser),
       backgroundColor: [
        '#0F172A',
        'rgba(54, 162, 235, 0.7)',
        'rgb(229 231 235)',
      ],
      borderColor: [
        '#0F172A',
        'rgba(54, 162, 235, 1)',
        'rgb(229 231 235)',
      ],
      borderWidth: 1,
        },
    ],
    }
   );
  }, [documentsPerUser]);
    
;
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.parsed;
          const label = context.label;
          return `${label}: ${value}`;
        },
      },
    },
  },
};


  return (
    <div className="flex flex-col full-height width-60-percent margin">
      <header className="flex justify-end items-end">
        <div className="flex items-center">
        </div>
      </header>
        {/* Main content - Editor */}
          <Card className="full-width full-height">
             <CardContent>
                <CardHeader  title={<div className={styles.cardHeader}>משתמשים עם מירב המסמכים</div>}></CardHeader>
                {documentsPerUser && data && <Pie data={data} options={options} />}
             </CardContent>
          </Card>
      </div>
  );
};