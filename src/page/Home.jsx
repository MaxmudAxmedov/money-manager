import { useEffect, useState } from "react";
import Input from "../components/Input";
import _ from "lodash";
import { getExchange } from "../client/getExchange";
import { CurrencySelector } from "../components/CurrencySelector";
import { CurrencySelector2 } from "../components/CurrencySelector2";
import ExchangeIcon from "../assets/transaction.png";
import Payment from "../components/Payment";

export default function Home() {
    const [data, setData] = useState({});
    const [data2, setData2] = useState({});
    const [loading, setLoading] = useState(true);
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
        const fetchData = async () => {
            const result = await getExchange();
            setLoading(false);
            if (result.success) {
                setLoading(true);
                setData(result);
            }
        };

        fetchData();
    }, []);

    const handleValue = (e) => {
        if (!isNaN(e.target.value)) {
            setValue(e.target.value);
        } else {
            alert("Faqat sonlarda kiriting");
        }
    };
    if (!loading) return <h1>Loading</h1>;
    console.log(data);
    return (
        <>
            <div className="p-10">
                <h3 className="text-2xl mb-4">Valyuta Konvertori</h3>
                <div className="d-flex align-items-center">
                    <Input
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

                <div className="mt-4">
                    {value != "" && select?.value && select2.value && (
                        <p>{`From ${value} ${select?.key} To ${
                            value * select2?.value
                        } ${select2?.key}`}</p>
                    )}
                </div>
                <div>
                    <h3>Pul o'tkazmalari</h3>
                    <Payment />
                </div>
            </div>
        </>
    );
}
