import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input, InputLabel, Card, CardContent, CardActions, CardHeader, Alert, Snackbar} from "@mui/material";
import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import styles from './login.module.css';
import { AuthContext, UserContext } from "../app/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { isNil } from "lodash";

export function Login() {
  const auth = useContext(AuthContext);
  const user = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false); // Snackbar visibility
  const navigate = useNavigate();

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
      loginWithEmailAndPasssword(email, password).then(() => {
        navigate("/");
      });
      
      } catch {
      setOpen(true); // Show snackbar
      }
    }, 1500);
  };

  const loginWithEmailAndPasssword = async (email, password) => { 
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("login successfull" + userCredential.user.displayName);
  }
  
  return (
      <div className="flex justify-center items-center min-80-percent">
        <Card className="full-width">
          <CardHeader className="text-center" title="התחברות" subheader="התחברו למערכת כדי להמשיך">  
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
              
              <div className="flex items-center justify-between space-top">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="rounded pad-left border-gray-300"
                  />
                  <InputLabel htmlFor="remember" className="text-sm font-medium">
                    זכור אותי
                  </InputLabel>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium"
                >
                  שכחת סיסמה?
                </Link>
              </div>
              
              <Button
                variant="contained"
                type="submit"
                color="secondary"
                className="full-width"
                disabled={isLoading}
              >
                {isLoading ? (
                  "מתחבר..."
                ) : (
                  <>
                    <LogIn className="space-left" /> התחברות
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardActions className="flex flex-col space-top text-center">
            <div className="text-sm text-gray">
              אין לך חשבון?{" "}
              <Link
                to="/signup"
                className="font-medium"
              >
                הרשמה
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
