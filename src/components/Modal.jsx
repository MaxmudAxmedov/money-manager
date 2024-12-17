import React, { useState } from "react";
import Input from "./Input";
import { moneyFormatter } from "../config/moneyFormatter";
import closeIcon from "../assets/close.png";
export default function Modal({setOpen, setValue, handleClick }) {
    const [currency, setCurrency] = useState("");
    const handleValue = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        if (!rawValue) {
            setCurrency("");
            return;
        }
        const formatter = moneyFormatter(rawValue, "UZS");
        setCurrency(formatter);
        setValue(parseInt(rawValue));
        
    };

    return (
        <div className="w-25  p-3 py-4 rounded border position-absolute top-50 start-50 translate-middle bg-light">
            <strong className="text-center">Hisobingizni to'ldiring</strong>
            <div className="d-flex pt-3">
                <Input
                    style={"mb-3 w-100"}
                    value={currency}
                    onChange={handleValue}
                    placeholder={"Summani kiriting"}
                />
                <img className="position-absolute end-0 top-0"  src={closeIcon} alt="close" position onClick={() => setOpen(false)}/>
  
            </div>

            <button
                onClick={() => {
                    handleClick();
                }}
                className="btn btn-success w-100"
            >
                Submit
            </button>
        </div>
    );
}
