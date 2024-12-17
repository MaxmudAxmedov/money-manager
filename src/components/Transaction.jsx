import React, { useContext, useEffect, useState } from "react";
import { deletePayments, getPayments } from "../client/server";
import { toast } from "react-toastify";
import { BalanceContext } from "../context/BalanceContext";
import { MoneyFormatter } from "./MoneyFormatter";

export default function Tranzaksiya() {
    const [data, setData] = useState([]);
    const { balance } = useContext(BalanceContext);
    const [category, setCategory] = useState([]);
    const getData = async (val) => {
        const filt = category.filter((i) => i.title == val);
        try {
            const res = await getPayments("/transfers");
            setData(res?.data);
            if (val == "undefined") {
                const result = await getPayments("/transfers");
                setData(result.data);
            } else if (val == "true" || val == "false") {
                const result = await getPayments("/transfers");
                const res = result.data.filter(
                    (i) => i.status == JSON.parse(val)
                );
                setData(res);
            } else if (filt.length) {
                const result = await getPayments("/transfers");
                const res = result.data.filter((i) => i.category == val);
                setData(res);
            }
        } catch (error) {
            toast.error("Xatolik");
        }
    };
    useEffect(() => {
        getData();
        const getCategory = async () => {
            try {
                const result = await getPayments("/pay");
                setCategory(result.data);
            } catch (error) {
                toast.error("Xatolik");
            }
        };

        getCategory();
    }, [balance]);

    const handleChange = (e) => {
        getData(e.target.value);
    };

    const handleStatus = (e) => {
        getData(e.target.value);
    };

    const handleDelete = async (id) => {
        try {
            await deletePayments("/transfers", id);
            getData();
        } catch (error) {
            console.log(error);
        }
    };

    const result = data.reduce(
        (acc, item) => {
            if (item.status) {
                acc.kirim += parseInt(item.sum);
            } else {
                acc.chiqim += parseInt(item.sum);
            }
            acc.umumiy += parseInt(item.sum);
            return acc;
        },
        { kirim: 0, chiqim: 0, umumiy: 0 }
    );

    return (
        <div>
            <h3 className="my-3">O'tkazmalar tarixi</h3>
            <div className="d-flex mb-3 justify-content-between">
                <select
                    className="p-2 rounded bg-success"
                    onChange={handleChange}
                >
                    <option value="undefined">Barcha category</option>
                    {category?.map((i, index) => {
                        return (
                            <option key={index} value={i.title}>
                                {i?.title}
                            </option>
                        );
                    })}
                </select>
                <select
                    className="p-2 rounded bg-success"
                    onChange={handleStatus}
                >
                    <option value="undefined">Kirim chiqim</option>
                    <option value="true">Kirim</option>
                    <option value="false">chiqim</option>
                </select>
            </div>
            <ul
                className="list-unstyled"
                style={{ height: "60vh", overflowY: "scroll" }}
            >
                {data?.length ? (
                    data?.map((i, index) => {
                        return (
                            <li className="border rounded p-3" key={index}>
                                <strong className="me-2">{i.title}</strong>
                                {i.status ? (
                                    <span className="text-success">Kirim</span>
                                ) : (
                                    <span className="text-danger">Chiqim</span>
                                )}
                                <p>
                                    <MoneyFormatter
                                        amount={i.sum}
                                        currency={"UZS"}
                                    />
                                </p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <time>
                                        {new Date(i.time).toLocaleString()}
                                    </time>
                                    <button
                                        onClick={() => handleDelete(i.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <h4 className="border rounded p-3">Mavjud emas</h4>
                )}
            </ul>
            <div className="border rounded p-2" style={{ height: "20vh" }}>
                <p className="text-success">
                    <strong>Kirim: </strong>
                    <MoneyFormatter amount={result.kirim} currency={"UZS"} />
                </p>

                <p className="text-danger">
                    <strong>Chiqim: </strong>
                    <MoneyFormatter amount={result.chiqim} currency={"UZS"} />
                </p>

                <p>
                    <strong>Umumiy: </strong>
                    <MoneyFormatter amount={result.umumiy} currency={"UZS"} />
                </p>
            </div>
        </div>
    );
}
