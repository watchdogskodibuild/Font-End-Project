import { useEffect, useRef, useState, useContext } from "react";
import { Button, Card, CardContent, CardHeader, FormControl, TextField} from "@mui/material";
import { Save } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext, admins, addTemplate, templateTypes } from '../app/app';
import { isNumber, template } from "lodash";
import { getDocumentsCountPerType } from "../app/app";
import styles from "./templates-used-chart.module.css";
import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export function TemplateUsedChart() {
  const [documentsPerType, setDocumentsPerType] = useState([]);
  
  useEffect(() => {
    getDocumentsCountPerType().then(numDocsPerType => setDocumentsPerType(numDocsPerType));
  }, []);

  const data = {
    labels: ['משרדי', 'לימודי', 'אישי'],
    datasets: [
        {
        label: 'כמות מסמכים',
        data: documentsPerType,
        backgroundColor: 'rgb(229 231 235)',
        borderColor: 'rgb(229 231 235)',
        borderWidth: 1,
        },
    ],
    };
    
    const options = {
    responsive: true,
    plugins: {
        legend: {
        position: 'top',
        },
        title: {
        display: false,
        text: 'כמות מסמכמים לפי סוג',
        },
    },
    };


  return (
    <div className="flex flex-col full-height full-width margin">
      <header className="flex justify-end items-end">
        <div className="flex items-center">
        </div>
      </header>
        {/* Main content - Editor */}
          <Card className="full-width full-height">
             <CardContent>
                <CardHeader  title={<div className={styles.cardHeader}>כמות מסמכים לפי סוג</div>}></CardHeader>
                <Bar options={options} data={data}></Bar>
             </CardContent>
          </Card>
      </div>
  );
};