import { Button } from "@mui/material";
import { signInWithPopup } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from './features/appSlice'
import { auth, googleProvider } from "./firebase";
import "./login.css";

function Login() {
    const dispatch = useDispatch()


    const signIn = () => {
       
        signInWithPopup(auth, googleProvider)
        .then((userAuth) => {
            dispatch(login({
                username: userAuth.user.displayName,
                profilePic: userAuth.user.photoURL,
                id: userAuth.user.uid,
            }))
        }) 
        .catch((error) => {
            console.log(error)
        })   
    }
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/fr/a/ad/Logo-Snapchat.png"
          alt=""
        />
        <Button variant="outline" onClick={signIn}>
        Sign In
        </Button>
        
      </div>
    </div>
  );
}

export default Login;
