import styles from './profile.module.css';
import React, { useState } from "react";
import { Card, CardContent, CardHeader, Button, FormLabel, TextField, FormControl, CardActions } from '@mui/material';
import { Link } from "react-router-dom";
import { updateUserProfile, UserContext } from '../app/app';
import { useContext, useEffect } from 'react';
import { isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { CustomCard } from '../card/card';

export const Profile = () => {
  const userProfile = useContext(UserContext);
  const navigate = useNavigate();
  const [name, setName] = useState();
  useEffect(() => {
    if(isNil(userProfile)) {
      navigate("/login");
      } else {
        setName(userProfile.displayName);
      }
  }, [userProfile]);

  const update = () => {
    updateUserProfile(name);
  }


  if(userProfile) {
  return (
        <div className="max-w-4xl mx-auto">
          <CustomCard className="text-center"  title="פרופיל משתמש" subTitle="צפה ועדכן את פרטי המשתמש שלך">
            <CardContent>
              <div className="flex flex-col">
                    <FormControl>
                      <FormLabel className="text-sm font-medium">שם מלא</FormLabel>
                      <TextField value={name} onChange={(e) => setName(e.target.value)}></TextField>
                    </FormControl>
                    <FormControl contentEditable="false">
                      <FormLabel className="text-sm font-medium">אימייל</FormLabel>
                      <TextField  value={userProfile.email}
                      inputProps={{ readOnly: true }}></TextField>
                    </FormControl>
 
              </div>
            </CardContent>
            <CardActions className="full-width justify-between padding-35-percent">
                <Button variant="contained" color="dark" onClick={update}>עדכן פרטים</Button>
             </CardActions>
          </CustomCard>
        </div>
    );
  }
  
}
