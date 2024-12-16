import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Tranzaksiya from "./components/tranzaksiya";

export default function Layout() {
    return (
        <div className="d-flex" style={{ width: "100vw" }}>
            <div style={{ width: "20%" }}>
                <Navbar />
            </div>
            <div className="container" style={{ width: "90%" }}>
                <Outlet />
            </div>
            <div className="container bg-info" style={{ width: "30%" }}>
                <Tranzaksiya />
            </div>
        </div>
    );
}
