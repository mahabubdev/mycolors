import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { 
    authRoutes,
    defaultRoutes,
    dashboardRoutes,
} from "./register";

// load user test
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../store/actions/auth'

// layouts
import DefaultLayout from './../components/layouts/DefaultLayout';
import CredentLayout from './../components/layouts/CredentLayout';
import DashboardLayout from './../components/layouts/DashboardLayout';

// pages
import HomePage from './../components/pages/HomePage';
import AboutPage from './../components/pages/AboutPage';
import ContactPage from './../components/pages/ContactPage';
import IndexPage from './../components/pages/dashboard/IndexPage';
import Palette from '../components/pages/dashboard/Palette';
import LoginPage from './../components/pages/auth/LoginPage';
import RegisterPage from './../components/pages/auth/RegisterPage';
import NotFound from './../components/pages/NotFound';


function Routes(props)  {

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

                <Route exact path={authRoutes}>
                    <AppRoute
                    exact path="/login"
                    layout={CredentLayout}
                    component={LoginPage}
                    />

                    <AppRoute
                    exact path="/register"
                    layout={CredentLayout}
                    component={RegisterPage}
                    />
                </Route>
                
                <Route exact path={defaultRoutes}>
                    <AppRoute
                    exact path="/"
                    layout={DefaultLayout}
                    component={HomePage}
                    />

                    <AppRoute
                    exact path="/home"
                    layout={DefaultLayout}
                    component={HomePage}
                    />
                    
                    <AppRoute
                    exact path="/about"
                    layout={DefaultLayout}
                    component={AboutPage}
                    />

                    <AppRoute
                    exact path="/contact"
                    layout={DefaultLayout}
                    component={ContactPage}
                    />
                </Route>

                <Route exact path={dashboardRoutes}>
                    <AppRoute
                    exact path="/dashboard"
                    layout={DashboardLayout}
                    component={IndexPage}
                    />

                    <AppRoute
                    exact path="/dashboard/pal"
                    layout={DashboardLayout}
                    component={Palette}
                    />
                </Route>


                <Route exact path="*">
                    <AppRoute
                    exact path="*"
                    layout={DefaultLayout}
                    component={NotFound}
                    />
                </Route>

            </Switch>
        </Router>
    );
}

export default Routes;