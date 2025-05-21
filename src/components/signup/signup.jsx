import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, InputLabel, Card, CardContent, CardActions, CardHeader, Alert, Snackbar, FormHelperText} from "@mui/material";
import { Eye, EyeOff, UserPlus, Mail } from "lucide-react";
import styles from './signup.module.css';
import { AuthContext } from "../../main";
import { createUserWithEmailAndPassword } from "firebase/auth";

export function Signup() {
  const auth = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerification, setPasswordVerification] = useState("");
  const [passwordVerificationValid, setpasswordVerificationValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerification, setShowPasswordVerification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); // Snackbar visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout( async () => {7
      setIsLoading(false);
      try {
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => { 
      const user = userCredential.user;
      console.log(user.email);
    })
      
      } catch {
      setOpen(true); // Show snackbar
      }
    }, 1500);
  };

  return (
      <div className="flex justify-center items-center min-80-percent">
        <Card className="fullWidth">
          <CardHeader className="text-center" title="הרשמה" subheader="הירשם למערכת כדי להתחיל">  
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-top">
              <div className="space-top">
                <InputLabel htmlFor="email">אימייל</InputLabel>
                <div className="relative pad-right">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="pad-left margin-right min-90-percent-width"
                  />
                  <Button><Mail className="input-button text-gray" /></Button>
                </div>
              </div>
              
              <div className="space-top">
                <InputLabel htmlFor="password">סיסמה</InputLabel>
                <div className="relative pad-right">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pad-left margin-right min-90-percent-width"
                  />
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
              </div>
               <div className="space-top">
                <InputLabel htmlFor="password">סיסמה</InputLabel>
                <div className="relative pad-right">
                  <Input
                    id="passwordVerification"
                    type={showPasswordVerification ? "text" : "password"}
                    value={passwordVerification}
                    onChange={(e) => setPasswordVerification(e.target.value)}
                    onBlur={() => setpasswordVerificationValid(password === passwordVerification)}
                    required
                    className="pad-left margin-right min-90-percent-width"
                  />
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
                      <FormHelperText className="align-text-right">
                      {!passwordVerificationValid ? "חייב להיות זהה לסיסמא" : " "}
                    </FormHelperText>
                  
                </div>
                  
              </div>
              
              <div className="space-top">
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className="fullWidth"
                disabled={isLoading || !passwordVerificationValid || !password  || !email || !passwordVerification}
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
              הכניסה נכשלה, אנא בדוק את פרטי ההתחברות
            </Alert>
        </Snackbar>

      
      </div>
  );
};
