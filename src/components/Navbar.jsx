import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/home.svg";
import AccountIcon from "../assets/account.png";
import SettingsIcon from "../assets/settings.png";
export default function Navbar() {
    return (
        <nav className="nav flex-column bg-success vh-100 w-100">
            <NavLink to="/" className="nav-link mb-4 pb-4 text-dark">
                <img className="w-25" src={HomeIcon} alt="" />
                Home
            </NavLink>
            <NavLink to="/account" className="nav-link pb-4 mb-4 text-dark">
                <img className="w-25" src={AccountIcon} alt="" />
                Account
            </NavLink>
            <NavLink to="/settings" className="nav-link pb-4 text-dark">
                <img className="w-25" src={SettingsIcon} alt="" />
                Settings
            </NavLink>
        </nav>
    );
}
