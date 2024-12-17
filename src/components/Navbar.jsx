import React from "react";
import { NavLink } from "react-router-dom";
import HomeIcon from "../assets/home.svg";
import AccountIcon from "../assets/account.png";
import SettingsIcon from "../assets/settings.png";
export default function Navbar() {
    return (
        <nav className="nav flex-column align-item-ceter border vh-100">
            <NavLink to="/" className="nav-link pb-3 text-dark">
                <img width={"35"} src={HomeIcon} alt="" />
            </NavLink>
            <NavLink to="/account" className="nav-link pb-3 text-dark">
                <img width={"35"} src={AccountIcon} alt="" /> 
            </NavLink>
            <NavLink to="/settings" className="nav-link pb-3 text-dark">
                <img width={"35"} src={SettingsIcon} alt="" />
            </NavLink>
        </nav>
    );
}
