import React from 'react';

import { firebase } from '@firebase/app';
import "firebase/auth";

import { auth, firestore } from "../firebaseClient";

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory
} from "react-router-dom";

function Profile(props) {
  const history = useHistory();
  const logoutButton = 
    <button onClick={() => {
      props.setUser(null);
      localStorage.removeItem("user");
      history.push("/");
    }}>Logout!</button>


  if (props.user) {
    return (
      <div className="profileContainer">
        <div className="profile">
          <div className="name">Name: {props.user.name} ({props.user.pronoun})</div>
          <div className="department">Department: {props.user.department}, year {props.user.year}</div>
          <div className="motto"><i>{props.user.motto}</i></div>

          {logoutButton}
        </div>
      </div>
    )
  } else {
    return (
      <Redirect to="/" />
    )
  }
}

export default Profile;