import React, { Fragment } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PublicRoute from "./PublicRoute";
import PrivatePetOwnerRoute from "./PrivatePetOwnerRoute";
import PrivatePCSAdminRoute from "./PrivatePCSAdminRoute";
import PrivateCareTakerRoute from "./PrivateCareTakerRoute";

import ROUTES from "./Routes";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

const AppRouter = () => {
  return (
    <Fragment>
      <ToastContainer />
      <BrowserRouter>
        <Switch>
          <PublicRoute path={ROUTES.HOME} exact={true} component={Home} />

          <PublicRoute
            path={ROUTES.REGISTER}
            exact={true}
            component={Register}
          />

          <PublicRoute path={ROUTES.SIGN_IN} exact={true} component={SignIn} />

          <PrivatePetOwnerRoute path={ROUTES.PET_OWNER_HOME} exact={true} />

          <PrivateCareTakerRoute path={ROUTES.CARE_TAKER_HOME} exact={true} />

          <PrivatePCSAdminRoute path={ROUTES.ADMIN_HOME} exact={true} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default AppRouter;
