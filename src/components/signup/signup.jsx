import React, { useContext, useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { Button, TextField, Card, CardContent, CardActions, CardHeader, Alert, Snackbar, FormHelperText, FormControl, FormLabel} from "@mui/material";
import { Eye, EyeOff, UserPlus, Mail } from "lucide-react";
import styles from './signup.module.css';
import { AuthContext, UserContext } from "../app/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {isNil} from "lodash";

export function Signup() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordVerificationValid, setpasswordVerificationValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); // Snackbar visibility

  useEffect( () => {
    if(!isNil(user)) {
      navigate("/");
    }
  }, [user]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout( async () => {7
      setIsLoading(false);
      try {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { 
        navigate("/");
    })
      
      } catch (e) {
      setOpen(true); // Show snackbar
      }
    }, 1500);
  };

  
  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
    if (e.target.validity.valid) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  
  const handlePasswordChange = async (e) => {
    setPassword(e.target.value);
    if (e.target.validity.valid) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
    if(passwordVerification) {
      setpasswordVerificationValid(e.target.value === passwordVerification);
    }
  };

  const handlePasswordVerificationChange = async (e) => {
    setPasswordVerification(e.target.value);
    setpasswordVerificationValid(password === e.target.value);
  };

  return (
      <div className="flex justify-center items-center min-80-percent">
        <Card className="full-width">
          <CardHeader className="text-center" title="הרשמה" subheader="הירשם למערכת כדי להתחיל">  
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-top">
              <div className="space-top row">
                <FormControl fullWidth className="width-80-percent" error={!emailValid}>
                  <FormLabel>אימייל</FormLabel>
                  <TextField
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}                 
                    error={!emailValid}
                    helperText={!emailValid ? "אנא הכנס מייל תקין" : ""}
                    placeholder="name@example.com"
                    required
                    className="pad-left margin-right"
                  />
                  </FormControl>
                  <Button><Mail className="input-button text-gray" /></Button>
              </div>
              
              <div className="space-top row">
                <FormControl fullWidth className="width-80-percent" error={!passwordValid}>
                <FormLabel>סיסמא</FormLabel>
                  <TextField
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    error={!passwordValid}
                    onChange={handlePasswordChange}
                    inputProps={{ minLength: 6 }}
                    helperText={!passwordValid ? "הכנס סיסמא באורך של 6 תווים לפחות" : ""}
                    required
                    className="pad-left margin-right min-90-percent-width"
                  />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    
                  >
                    {showPassword ? (
                      <EyeOff className="input-button text-gray" />
                    ) : (
                      <Eye className="input-button text-gray" />
                    )}
                  </Button>
                </div>
               <div className="space-top row">
                <FormControl fullWidth className="width-80-percent" error={!passwordVerificationValid}>
                <FormLabel>אישור סיסמא</FormLabel>
                  <TextField
                    id="passwordVerification"
                    type={showPasswordVerification ? "text" : "password"}
                    value={passwordVerification}
                    onChange={handlePasswordVerificationChange}
                    required
                    helperText={!passwordVerificationValid ? "חייב להיות זהה לסיסמא" : ""}
                    error={!passwordVerificationValid}
                    className="pad-left margin-right min-90-percent-width"
                  />
                  </FormControl>
                  <Button
                    type="button"
                    onClick={() => setShowPasswordVerification(!showPasswordVerification)}
                    
                  >
                    {showPasswordVerification? (
                      <EyeOff className="input-button text-gray" />
                    ) : (
                      <Eye className="input-button text-gray" />
                    )}
                  </Button>  
              </div>
              
              <div className="space-top">
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className="fullWidth"
                disabled={isLoading || !emailValid || !passwordVerificationValid || !password  || !email || !passwordVerification}
              >
                {isLoading ? (
                  "נרשם..."
                ) : (
                  <>
                    <UserPlus className="space-left" /> הרשמה
                  </>
                )}
              </Button>
              </div>
            </form>
          </CardContent>
          <CardActions className="flex flex-col space-top text-center">
            <div className="text-sm text-gray">
              יש לך חשבון קיים?{" "}
              <Link
                to="/login"
                className="font-medium"
              >
                התחברות
              </Link>
            </div>
           
          </CardActions>
        </Card>
        <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
            <Alert onClose={() => setOpen(false)} severity="error">
              הרשמה נכשלה, אנא בדוק את פרטי ההרשמה
            </Alert>
        </Snackbar>

      
      </div>
  );
};
