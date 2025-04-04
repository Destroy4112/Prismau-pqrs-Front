import { TextInput } from "flowbite-react";
import React from "react";

export default function InputIcon({
    label, type, icon, value, placeholder, handleChange, name, error, clase, disabled, required }) {

    return (
        <div className={`${clase ? clase : 'w-full'}`}>
            <label htmlFor={"id_" + name} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <TextInput
                id={"id_" + name}
                type={type}
                onChange={handleChange}
                name={name}
                value={value}
                icon={icon}
                placeholder={placeholder}
                color={error && "failure"}
                disabled={disabled}
                required={required}
            />
        </div>
    );
}
