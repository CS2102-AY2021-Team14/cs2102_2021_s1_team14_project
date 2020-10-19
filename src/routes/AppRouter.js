import React from 'react';
import { BrowserRouter, Switch } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivatePetOwnerRoute from "./PrivatePetOwnerRoute";
import ROUTES from "./Routes";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

import PetOwnerHome from "../pages/petowner/PetOwnerHome";

const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <PublicRoute path={ROUTES.SIGN_IN} component={SignIn} />
      <PublicRoute path={ROUTES.REGISTER} component={Register} />

      <PrivatePetOwnerRoute path={ROUTES.PET_OWNER_HOME} component={PetOwnerHome} />
      <PublicRoute path={ROUTES.HOME} exact={true} component={Home} />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
