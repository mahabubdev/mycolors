import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { 
    defaultRoutes,
    dashboardRoutes,
    credentialRoutes
} from "./register";

// pages
import DefaultLayout from './../components/layouts/DefaultLayout';
import DashboardLayout from './../components/layouts/DashboardLayout';
import CredentialsLayout from './../components/layouts/CredentialsLayout';

import HomePage from './../components/pages/HomePage';
import AboutPage from './../components/pages/AboutPage';
import NotFound from './../components/pages/NotFound';
import LoginPage from './../components/pages/LoginPage';
import RegisterPage from './../components/pages/RegisterPage';
import IndexPage from '../components/pages/dashboard/IndexPage';


import AuthCheck from './private/AuthCheck';




function Routes( props )  {

    // Dynamic Routes and Components
    const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
        <Route {...rest} render={ props => (
            <Layout>
                <Component {...props}></Component>
            </Layout>
        )}/>
    );

    // Return
    return (
        <Router>
            <Switch>
                  {/* Default Layouts */}
                <Route exact path={defaultRoutes}>
                    <AppRoute
                    exact
                    path="/"
                    layout={DefaultLayout}
                    component={HomePage}
                    />

                    <AppRoute
                    exact
                    path="/about"
                    layout={DefaultLayout}
                    component={AboutPage}
                    />

                    <AppRoute
                    exact
                    path="/login"
                    layout={CredentialsLayout}
                    component={LoginPage}
                    />


                    <AppRoute
                    exact
                    path="/register"
                    layout={CredentialsLayout}
                    component={RegisterPage}
                    />

                </Route>



                <Route exact path={dashboardRoutes}>
                    <AuthCheck
                    exact
                    path="/dashboard"
                    layout={DashboardLayout}
                    component={IndexPage}
                    />

                </Route>




                

                

                {/* Not Found */}
                <Route exact path="*">
                    <AppRoute
                    exact
                    path="*"
                    layout={DefaultLayout}
                    component={NotFound}
                    />
                </Route> 

            </Switch>
        </Router>
    );
}

export default Routes;