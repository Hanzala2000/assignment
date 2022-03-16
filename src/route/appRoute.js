import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sign from '../components/sign'
import Log from '../components/log'
import UserProfile from '../components/userProfile'
import Home from "../components/home";
import Start from "../components/start";
export default function RouterApp() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact>
            <Start />
          </Route>
          <Route path="/userProfile">
            <UserProfile />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/sign">
            <Sign />
          </Route>
          <Route path="/log">
            <Log />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}