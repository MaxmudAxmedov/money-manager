import React, { useContext, useState } from "react";
import Input from "./Input";
import { BalanceContext } from "../context/BalanceContext";
import { toast } from "react-toastify";
import { postPayments } from "../client/server";
import { setLocal } from "../config/localStorage";
export default function Form({ parent }) {
    const { balance, setBalance } = useContext(BalanceContext);
    const [value, setValue] = useState(0);
    const [pnfl, setPnfl] = useState("");
    const time = new Date();
    const handleChange = (e) => {
        if (!isNaN(e.target.value)) {
            setValue(e.target.value);
        } else {
            toast.error("Faqat raqam kiriting");
        }
    };
    const handlePost = async (e) => {
        e.preventDefault();
        console.log(e);
        try {
            await postPayments("/transfers", {
                category: parent?.category,
                title: parent?.title,
                sum: value,
                pnfl,
                time,
                status: false,
            });
            setBalance(balance - value);
            setLocal("balance", balance - value);
            toast.success("Qo'shildi");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form className="bg-light p-4 rounded" onSubmit={handlePost}>
            <p className="text-center">{parent.title}</p>
            <Input
                style={"input-group w-100 mb-2"}
                placeholder={"Raqamingizni kiriting"}
                onChange={(e) => setPnfl(e.target.value)}
            />

            <Input
                onChange={handleChange}
                style={"input-group w-100 mb-2"}
                placeholder={"summani kiriting"}
            />
            {balance - value < 0 ? (
                <span className="text-danger">
                    {balance - value} Hisobingizga mablag' yetarli emas !{" "}
                </span>
            ) : (
                <span className="text-success ps-2">
                    {/* <MoneyFormatter
                        amount={balance - value < 0 ? "" : balance - value}
                        currency={"UZS"}
                    /> */}
                </span>
            )}

            <button
                className="btn btn-success w-100 mt-4"
                disabled={balance - value < 0}
                type="submit"
            >
                Submit
            </button>
        </form>
    );
}
