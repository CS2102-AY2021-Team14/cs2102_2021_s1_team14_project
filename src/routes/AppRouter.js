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

<<<<<<< HEAD
import { UserContext } from "../utils/UserProvider";

import PetOwnerHome from "../pages/petowner/PetOwnerHome";
import CareTakerHome from '../pages/caretaker/CareTakerHome';
import CareTakerHistory from '../pages/caretaker/CareTakerHistory';
import PrivateCareTakerRoute from "./PrivateCareTakerRoute";

=======
>>>>>>> 81df8a3946881114a6012ecc30a2e6e96be4034a
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

          <PrivatePetOwnerRoute path={ROUTES.PET_OWNER_HOME} />

          <PrivateCareTakerRoute path={ROUTES.CARE_TAKER_HOME} />

          <PrivatePCSAdminRoute path={ROUTES.ADMIN_HOME} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
};

export default AppRouter;
