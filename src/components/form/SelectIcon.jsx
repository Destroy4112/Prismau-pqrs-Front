import { Select } from "flowbite-react";
import React from "react";

export default function SelectIcon({ label, items = [], handleChange, name, value, icon, error, clase }) {
    return (
        <div className={`${clase ? clase : 'w-full'}`}>
            <label htmlFor={"id_" + name} className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <Select id={"id_" + name} icon={icon} defaultValue={value || ""} onChange={handleChange} name={name}
                color={error && "failure"} helperText={error && <span>Este campo es requerido</span>}>
                <option value="" disabled>
                    Escoja una opción
                </option>
                {items.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </Select>
        </div>
    );
}
