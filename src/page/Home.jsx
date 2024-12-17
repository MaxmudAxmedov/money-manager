import { useEffect, useState } from "react";
import Input from "../components/Input";
import _ from "lodash";
import { getExchange } from "../client/getExchange";
import { CurrencySelector } from "../components/CurrencySelector";
import { CurrencySelector2 } from "../components/CurrencySelector2";
import ExchangeIcon from "../assets/transaction.png";
import Payment from "../components/Payment";
import { moneyFormatter } from "../config/moneyFormatter.js";
import { toast } from "react-toastify";

export default function Home() {
    const [data, setData] = useState({});
    const [data2, setData2] = useState({});
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState("");
    const [value, setValue] = useState(0);
    const [select, setSelect] = useState({
        key: "Valyutani tanlang",
        value: 0,
    });

    const [select2, setSelect2] = useState({
        key: "Valyutani tanlang",
        value: 0,
    });

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await getExchange();
                setLoading(false);
                if (result.success) {
                    setLoading(true);
                    setData(result);
                } else {
                    toast.error(result.message);
                }
            };
            fetchData();
        } catch (error) {
            toast.error(error);
        }
    }, []);
    const handleValue = (e) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        if (!rawValue) {
            setCurrency("");
            return;
        }
        const formatter = moneyFormatter(rawValue, "UZS");
        setCurrency(formatter);
        setValue(rawValue);
    };

    return (
        <>
            <div className="p-10">
                <h3 className="text-2xl mb-4">Valyuta Konvertori</h3>
                <div className="d-flex align-items-center">
                    <Input
                        value={currency}
                        onChange={handleValue}
                        placeholder={"Summani kiriting"}
                    />
                    <CurrencySelector
                        setData={(initialData) => setData(initialData)}
                        options={data?.data?.conversion_rates}
                        onSelect={(currency) => setSelect({ ...currency })}
                        initial={select}
                    />
                    <img src={ExchangeIcon} alt="" />
                    <CurrencySelector2
                        setData2={(initialData) => setData2(initialData)}
                        options={data?.data?.conversion_rates}
                        onSelect={(currency) => setSelect2({ ...currency })}
                        initial={select2}
                    />
                </div>

                {value != "" && select?.value && select2.value && (
                    <div className="mt-2 bg-secondary p-2 text-light rounded d-inline-block">
                        <>
                            <strong className="me-2">
                                {moneyFormatter(value, select?.key)}
                            </strong>
                            <strong>
                                {moneyFormatter(
                                    value * select2?.value,
                                    select2.key
                                )}
                            </strong>
                        </>
                        ƒ
                    </div>
                )}
                <div>
                    <h3>Pul o'tkazmalari</h3>
                    <Payment />
                </div>
            </div>
        </>
    );
}
