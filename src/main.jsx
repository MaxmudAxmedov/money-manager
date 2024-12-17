import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import BalanceProvider from "./context/BalanceContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <BalanceProvider>
            <App />
            <ToastContainer />
        </BalanceProvider>
    </BrowserRouter>
);
