import React from "react";

export default function Input({style, value, onChange, placeholder}) {
    return (
        <div className={style}>
            <input
                onChange={onChange}
                type="text"
                value={value}
                className="form-control p-2"
                placeholder={placeholder}
            />
        </div>
    );
}
