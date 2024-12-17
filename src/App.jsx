import { Route, Routes } from "react-router-dom";
import "./App.scss"
import Layout from "./Layout";
import Home from "./page/Home";
import Account from "./page/Account";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout />}> 
              <Route path="/" index element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/settings" element={<h1>Settings page</h1>} />
              <Route path="/*" element={<h1>Not Found</h1>} />
            </Route>
        </Routes>
    );
}

export default App;
