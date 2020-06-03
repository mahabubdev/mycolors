import React from "react";
import { NavLink } from 'react-router-dom';
import "../../css/sidebar.css"

import { useSelector } from "react-redux";

import { 
    GoDashboard,
    GoPackage,
    GoPerson
} from "react-icons/go"

function Sidebar (props) {
    // dynamic styles

    const theme = useSelector( state => (state.theme) ); // Theme State

    const menuExp = {
        display: 'inline-block',
    }

    const menuColl = {
        display: 'none',
    }

    const menuSvg = {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '30px',
    }


    return (
        <div className="sidebar-wrapper" style={
            theme.sideExpanded ? theme.sidenav.expanded.width : theme.sidenav.collapsed.width
        }>
            <div className="nav-menu">
                <div className="branding">
                    <span className="logo" style={
                        theme.sideExpanded ? theme.sidenav.expanded.logo : theme.sidenav.collapsed.logo
                    }>myColors</span>
                </div>
                <div className="main-menu">
                    <ul>
                        <li><NavLink to="/dashboard" style={
                            theme.sideExpanded ? null : menuSvg
                        }><GoDashboard /><span style={
                            theme.sideExpanded ? menuExp : menuColl
                        }>Dashboard</span></NavLink></li>
                        <li><NavLink to="/dashboard/pal" activeClassName="activeNow" style={
                            theme.sideExpanded ? null : menuSvg
                        }><GoPackage /> <span style={
                            theme.sideExpanded ? menuExp : menuColl
                        }>Palettes</span></NavLink></li>
                        <li><NavLink to="/dashboard/profile" activeClassName="activeNow" style={
                            theme.sideExpanded ? null : menuSvg
                        }><GoPerson /> <span style={
                            theme.sideExpanded ? menuExp : menuColl
                        }>Profile</span></NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
