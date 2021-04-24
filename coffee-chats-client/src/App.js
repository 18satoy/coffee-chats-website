import React, { useState, useEffect } from 'react';
import './App.css';
// import { Link } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { firebase } from '@firebase/app';
import "firebase/auth";

import { auth, firestore } from "./firebaseClient";

import CCNavbar from './components/modules/Navbar';
import Login from './components/modules/Login';

import Feedback from './components/pages/Feedback';
import MatchDetail from './components/pages/MatchDetail';
import MatchHistory from './components/pages/MatchHistory';
import Preferences from './components/pages/Preferences';
import Profile from './components/pages/Profile';
import Home from './components/pages/Home';
// import Logout from './components/Logout';

function App(props) {
  const [ user, setUser ] = useState(null);

  function handleLogout() {
    setUser(null);
    localStorage.removeItem("user");
  }

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  });

    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  return (
    <>
    <div className="App">
    <Router>
      <CCNavbar 
          user={user}
      />
      <Switch>
        <Route path="/profile">
          <Profile user={user} setUser={setUser} />
        </Route>
        <Route path="/home">
          <Home user={user} setUser={setUser} />
        </Route>
        <Route path="/feedback">
          <Feedback user={user} setUser={setUser}/>
        </Route>
        <Route path="/matchlist">
          <MatchHistory user={user} setUser={setUser}/>
        </Route>
        <Route path="/match">
          <MatchDetail user={user} setUser={setUser}/>
        </Route>
        <Route path="/preferences">
          <Preferences user={user} setUser={setUser}/>
        </Route>

        <Route path="/">
          <Login user={user} setUser={setUser} />
        </Route>
      </Switch>
    </Router>
    </div>
    </>
  )
}

export default App;
