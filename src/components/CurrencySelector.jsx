import React, { useState } from "react";
import { getExchange } from "../client/getExchange";
import Input from "./Input";

export const CurrencySelector = ({ options, setData, onSelect, initial }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [loading, setLoading] = useState(true);
    const fetchData = async (url) => {
        const result = await getExchange(url);
        setData(result);
        setLoading(false);
        if (result.success) {
            setLoading(true);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearch(query);
    };

    const handleSelect = (option) => {
        const selectedOption =
            option.target.options[option.target.selectedIndex];
        const key = selectedOption.textContent;
        fetchData(key);
        onSelect({
            key,
            value: option.target.value,
        });

        setIsOpen(false);
        setSearch("");
    };
    console.log(initial?.key);
    return (
        <div className="position-relative w-64">
            {!isOpen && (
                <>
                    <div
                        className="border p-2 rounded cursor-pointer"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span>{initial?.key}</span>
                    </div>
                </>
            )}

            {isOpen && (
                <div className="w-full rounded z-10 shadow-lg">
                    <Input
                        type="text"
                        placeholder="Qidiruv..."
                        value={search}
                        onChange={handleSearch}
                        className="p-2 w-full bg-transparent rounded outline-none"
                    />
                    <select
                        className="w-100 overflow-y-auto bg-transparent p-2 rounded"
                        onChange={(e) => {
                            handleSelect(e);
                            setIsOpen(!isOpen);
                        }}
                    >
                        <option> USD </option>
                        {options != undefined &&
                            Object.entries(options)?.map(
                                ([key, value], index) => (
                                    <option
                                        key={index}
                                        value={value}
                                        className="p-2  cursor-pointer"
                                    >
                                        {key}
                                    </option>
                                )
                            )}
                        {options === "" && (
                            <option className="p-2">Hech nima topilmadi</option>
                        )}
                    </select>
                </div>
            )}
        </div>
    );
};
