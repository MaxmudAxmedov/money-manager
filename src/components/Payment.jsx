import React, { useEffect, useState } from "react";
import { getPayments } from "../client/server";
import Form from "./Form";
import BackIcon from "../assets/back.png";
import { NavLink } from "react-router-dom";
export default function Payment() {
    const [pay, setPay] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [open, setOpen] = useState(true);
    const [openForm, setOpenForm] = useState(false);
    const [parent, setParent] = useState({ category: "", title: "" });
    useEffect(() => {
        const fetchData = async () => {
            const result = await getPayments("/pay");
            setPay(result.data);
        };
        fetchData();
    }, []);
    const handleClick = (e) => {
        const res = pay.filter((i) => i.title == e);
        setFilterData(res);
        setOpen(false);
        setParent({ ...parent, category: e });
    };

    const handlePay = (e) => {
        setOpenForm(true);
        setParent({ ...parent, title: e });
    };

    console.log(filterData);
    return (
        <div className="d-flex position-relative ps-5">
            {open ? (
                <ul className="list-unstyled">
                    {pay?.map((i, index) => {
                        return (
                            <li key={index} className="border rounded p-2 mb-2" style={{cursor: 'pointer'}}>
                                {i.title == "Hisobim" ? (
                                    <NavLink
                                        className={"text-dark"}
                                        style={{ textDecoration: "none" }}
                                        to={"/account"}
                                    >
                                        <strong>{i.title}</strong>
                                    </NavLink>
                                ) : (
                                    <strong
                                        onClick={() => handleClick(i.title)}
                                    >
                                        {i.title}
                                    </strong>
                                )}
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <button
                    className="position-absolute bg-transparent start-0 p-0 "
                    onClick={() => {
                        setOpen(true);
                        setOpenForm(false);
                    }}
                >
                    <img className="w-25" src={BackIcon} />
                </button>
            )}
            {!open && (
                <ul className="list-unstyled">
                    {filterData[0]?.company?.map((i, index) => {
                        return (
                            <li key={index} className="border rounded p-2 mb-2" onClick={() => handlePay(i.name)} style={{cursor: 'pointer'}}>
                                <strong>
                                    {i.name}
                                </strong>
                            </li>
                        );
                    })}
                </ul>
            )}

            <div className="px-3"> {openForm && <Form parent={parent} />}</div>
        </div>
    );
}
