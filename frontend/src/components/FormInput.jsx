import React from "react";

const FormInput = ({ label, type, name, value, onChange, required }) => {
  return (
    <div className="input-field mb-4">
      <label className="block text-lg font-medium text-gray-700">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 text-lg focus:outline-none focus:border-[#4c56d7]"
      />
    </div>
  );
};

export default FormInput;
