import { createContext, useState } from "react";
import { getLocal } from "../config/localStorage";

export const BalanceContext = createContext();

export default function BalanceProvider({ children }) {
    const [balance, setBalance] = useState(getLocal("balance") || 0);
    return (
        <BalanceContext.Provider value={{ balance, setBalance }}>
            {children}
        </BalanceContext.Provider>
    );
}
