import React from "react";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Transaction from "./components/Transaction.jsx";

export default function Layout() {
    return (
        <div className="d-flex" style={{ width: "100vw" }}>
            <div style={{ width: "10%" }}>
                <Navbar />
            </div>
            <div className="container" style={{ width: "90%" }}>
                <Outlet />
            </div>
            <div className="border" style={{ width: "30%" }}>
                <Transaction />
            </div>
        </div>
    );
}
