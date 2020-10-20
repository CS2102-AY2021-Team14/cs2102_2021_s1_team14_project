import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivatePetOwnerRoute from "./PrivatePetOwnerRoute";
import ROUTES from "./Routes";

import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Register from "../pages/Register";

import PetOwnerHome from "../pages/petowner/PetOwnerHome";



const AppRouter = () =>{ 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  
  return(
    <BrowserRouter>
      <Switch>
        {/* <PublicRoute path={ROUTES.SIGN_IN} component={SignIn} />
        <PublicRoute path={ROUTES.REGISTER} component={Register} setAuth={setAuth} />

        <PrivatePetOwnerRoute path={ROUTES.PET_OWNER_HOME} component={PetOwnerHome} />
        <PublicRoute path={ROUTES.HOME} exact={true} component={Home} /> */}
        <Route path={ROUTES.REGISTER} render={ props => !isAuthenticated ? <Register {...props} setAuth={setAuth} /> 
                                                                          : (<Redirect to={ROUTES.SIGN_IN} />) } />
        <Route path={ROUTES.SIGN_IN} render={ props => !isAuthenticated ? <SignIn {...props} setAuth={setAuth} />
                                                                        : (<Redirect to={ROUTES.PET_OWNER_HOME} />) } />
        <Route path={ROUTES.PET_OWNER_HOME} component={PetOwnerHome} />
        <PublicRoute path={ROUTES.HOME} exact={true} component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
