import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sign from '../components/sign'
import Log from '../components/log'
import UserProfile from '../components/userProfile'
import Home from "../components/home";
import Start from "../components/start";
import {PrivateRoute,PublicRoute} from "./privateRoute";
export default function RouterApp() {
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute path="/" exact>
            <Start />
          </PublicRoute>
          <PrivateRoute path="/userProfile">
            <UserProfile />
          </PrivateRoute>
          <PublicRoute path="/home">
            <Home />
          </PublicRoute>
          <PublicRoute path="/sign">
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