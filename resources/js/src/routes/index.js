import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { 
    authRoutes,
    defaultRoutes,
    dashboardRoutes,
} from "./register";

// load user test
import { useSelector } from 'react-redux';
//import { loadUser } from '../store/actions/auth'

// layouts
import DefaultLayout from './../components/layouts/DefaultLayout';
import CredentLayout from './../components/layouts/CredentLayout';
import DashboardLayout from './../components/layouts/DashboardLayout';

// pages
import HomePage from './../components/pages/HomePage';
import AboutPage from './../components/pages/AboutPage';
import ContactPage from './../components/pages/ContactPage';
import IndexPage from './../components/pages/dashboard/IndexPage';
import EditProfile from './../components/pages/dashboard/EditProfile';
import PaletteEdit from './../components/pages/dashboard/PaletteEdit';
import PaletteView from './../components/pages/dashboard/PaletteView';
import Palette from '../components/pages/dashboard/Palette';
import Profile from './../components/pages/dashboard/Profile';
import LoginPage from './../components/pages/auth/LoginPage';
import ForgotPage from './../components/pages/auth/ForgotPage';
import RegisterPage from './../components/pages/auth/RegisterPage';
import NotFound from './../components/pages/NotFound';



import ls from '../utils/secureLS'; // secure localStorage Data
// set Auth Token if authenticated ... 
import setAuthToken from '../token/setAuthToken';






function Routes(props)  {

    const auth = useSelector( state => (state.auth));

    // set auth token
    useEffect(() => {
        const AuthTokenInit = () => {
            const setTokenNow = () => {
                if (ls.get('token')) {
                    setAuthToken(ls.get('token'));
                    //console.log(JSON.parse(localStorage.getItem('token')));
                    console.log('Token setuped')
                }
                else {
                    console.log('Token is not set');
                }
            }
            setTokenNow(); //called
        }
        AuthTokenInit(); // checking token for already logged in or not
    }, [auth])


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
                    exact path="/forgot"
                    layout={CredentLayout}
                    component={ForgotPage}
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


                    <AppRoute
                    exact path="/dashboard/profile"
                    layout={DashboardLayout}
                    component={Profile}
                    />

                    <AppRoute
                    exact path="/dashboard/profile/edit"
                    layout={DashboardLayout}
                    component={EditProfile}
                    />



                    <AppRoute
                    exact path="/dashboard/edit/:palette"
                    layout={DashboardLayout}
                    component={PaletteEdit}
                    />



                    <AppRoute
                    exact path="/dashboard/palette/:palette"
                    layout={DashboardLayout}
                    component={PaletteView}
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