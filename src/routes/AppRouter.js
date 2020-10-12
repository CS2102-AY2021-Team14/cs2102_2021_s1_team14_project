import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ROUTES from "./Routes";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path={ROUTES.SIGN_IN} component={SignIn} />
      <PublicRoute path={ROUTES.REGISTER} component={Register} />

      <PublicRoute path={ROUTES.HOME} component={Home} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
