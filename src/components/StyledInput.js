import React from 'react';
import { Input } from 'antd';

const StyledInput = ({ label, type = 'text', min, value, onChange, placeholder }) => (
    <div className="styled-input mb-4">
        <label className="leading-none text-sm mb-0">{label}</label>
        <Input
            type={type}
            min={min}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
    </div>
);

export default StyledInput;