import { Textarea } from 'flowbite-react';

export default function TextAreaField({ label, name, handleChange, value, error, disabled, clase }) {
    return (
        <div className={clase ? clase : 'w-full'}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <Textarea placeholder={label} value={value} onChange={handleChange} name={name} rows={4}
                color={error && "failure"} disabled={disabled} />
        </div>
    );
}
