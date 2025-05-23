import styles from './profile.module.css';
import React from "react";
import { Card, CardContent, CardHeader, Button, FormLabel, TextField, FormControl, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import { UserContext } from '../app/app';
import { useContext, useEffect } from 'react';
import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const userProfile = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(isNil(userProfile)) {
      navigate("/login");
      }
  }, [userProfile]);


  if(userProfile) {
  return (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader className="text-center" title="פרופיל משתמש" subheader="צפה ועדכן את פרטי המשתמש שלך">
            </CardHeader>
            <CardContent>
              <div className="flex flex-col">
                    <FormControl>
                      <FormLabel className="text-sm font-medium">שם מלא</FormLabel>
                      <TextField value={userProfile.displayName}></TextField>
                    </FormControl>
                    <FormControl contentEditable="false">
                      <FormLabel className="text-sm font-medium">אימייל</FormLabel>
                      <TextField  value={userProfile.email}
                      inputProps={{ readOnly: true }}></TextField>
                    </FormControl>
 
              </div>
            </CardContent>
            <CardActions className="full-width justify-between padding-35-percent">
                <Button  variant="contained" color="secondary">איפוס סיסמה</Button>
                <Button variant="contained" color="secondary">עדכן פרטים</Button>
             </CardActions>
          </Card>
        </div>
    );
  }
  
}
