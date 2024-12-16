import React from "react";

export default function Input({style, onChange, placeholder}) {
    return (
        <div className={style}>
            <input
                onChange={onChange}
                type="text"
                className="form-control p-2"
                placeholder={placeholder}
            />
        </div>
    );
}
