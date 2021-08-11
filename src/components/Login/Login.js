import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }


    const handleGoogleSignIn = () =>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
    // console.log(user, token);
    setLoggedInUser(user)
    history.replace(from);

  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
    }
    return (
        <div style={{textAlign:'center',}}>
            <h1>This is Login</h1>
            <p>Name: {loggedInUser.displayName}</p>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
        </div>
    );
};

export default Login;