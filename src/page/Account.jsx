import React, { useContext, useEffect, useState } from "react";
import { BalanceContext } from "../context/BalanceContext";
import { setLocal } from "../config/localStorage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { getPayments, postPayments } from "../client/server";
import { getExchange } from "../client/getExchange";
import { moneyFormatter } from "../config/moneyFormatter";
import Modal from "../components/Modal";
import Diagram from "../components/Diagram";
export default function Account() {
    const { balance, setBalance } = useContext(BalanceContext);
    const [transfers, setTransfers] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
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
        let money = balance + value;
        try {
            if (value > 0) {
                let res = await postPayments("/transfers", {
                    category: "Hisobim",
                    title: "Hisobimga tushum",
                    sum: value,
                    pnfl: uuidv4(),
                    time,
                    status: true,
                });
                setBalance(money);
                setLocal("balance", money);
                toast.success(res.message);
                setOpen(false);
            } else {
                toast.error("Qiymatni kiriting");
            }
        } catch (error) {
            toast.error(error);
        }
    };
    return (
        <div className="p-3">
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
                {open && (
                    <Modal
                        handleClick={handleClick}
                        setValue={(value) => setValue(value)}
                        setOpen={setOpen}
                    />
                )}

                <button
                    className="btn btn-primary"
                    onClick={() => setOpen(true)}
                >
                    Balansni to'ldirish
                </button>
            </div>

            <h4 className="text-center m-3">Xarajatlar diagrammasi</h4>
            <div style={{width: 740}} className="d-flex justify-content-center m-auto mt-3">
                <Diagram data={transfers} />
            </div>
        </div>
    );
}
