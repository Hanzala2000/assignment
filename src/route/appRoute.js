import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Sign from '../components/sign'
import Log from '../components/log'
import UserProfile from '../components/userProfile'
import Home from "../components/home";
import {PrivateRoute,PublicRoute} from "./privateRoute";
export default function RouterApp() {
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute path="/userProfile">
            <UserProfile />
          </PrivateRoute>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <PublicRoute exact path="/">
            <Sign />
          </PublicRoute>
          <PublicRoute path="/log">
            <Log />
          </PublicRoute>
        </Switch>
      </div>
    </Router>
  );
}