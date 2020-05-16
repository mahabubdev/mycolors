import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { 
    defaultRoutes,
    dashboardRoutes
} from "./register";

// pages
import DefaultLayout from './../components/layouts/DefaultLayout';
import HomePage from './../components/pages/HomePage';
import NotFound from './../components/pages/NotFound';

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
                    exact path="/home"
                    layout={DefaultLayout}
                    component={HomePage}
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