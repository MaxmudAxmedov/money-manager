import React, { useContext, useEffect, useState } from "react";
import { BalanceContext } from "../context/BalanceContext";
import { setLocal } from "../config/localStorage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { getPayments, postPayments } from "../client/server";
import Diagramma from "../components/Diagramma";
import { getExchange } from "../client/getExchange";
import { moneyFormatter } from "../config/moneyFormatter";
export default function Account() {
    const { balance, setBalance } = useContext(BalanceContext);
    const [transfers, setTransfers] = useState([]);
    const [data, setData] = useState([]);
    const time = new Date();
    const getTransaction = async () => {
        try {
            const result = await getPayments("/transfers");
            setTransfers(result.data);
        } catch (error) {}
    };
    useEffect(() => {
        getTransaction();
        const fetchData = async () => {
            const result = await getExchange("/uzs");
            if (result.success) {
                setData(result.data);
            }
        };

        fetchData();
    }, []);
    const handleClick = async () => {
        const prom = +prompt("Balansni to'ldirish");
        let money = balance + prom;
        try {
            if (prom != "") {
                let res = await postPayments("/transfers", {
                    category: "Hisobim",
                    title: "Hisobimga tushum",
                    sum: prom,
                    pnfl: uuidv4(),
                    time,
                    status: true,
                });
                setBalance(money);
                setLocal("balance", money);
                console.log(res);
                toast.success("Qo'shildi");
            }
        } catch (error) {
            toast.error("Xato");
        }
    };
    return (
        <div className=" p-3">
            <div className="d-flex">
                <div className="bg-success text-light me-3 rounded p-2">
                    <div>{moneyFormatter(balance, "UZS")}</div>
                    <div>
                        {moneyFormatter(
                            data?.conversion_rates?.USD * balance,
                            "USD"
                        )}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleClick}>
                    Balansni to'ldirish
                </button>
            </div>

            <h4 className="text-center m-3">Xarajatlar diagrammasi</h4>
            <div className="w-75 d-flex justify-content-center m-auto mt-3">
                <Diagramma data={transfers} />
            </div>
        </div>
    );
}
