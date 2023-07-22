import React from 'react';

const InputField = ({
  value,
  setValue,
  nameKey,
  type,
  invalidFields,
  setInvalidFields,
  placeholder,
}) => {
  return (
    <div className="w-full relative">
      {value.trim() !== '' && (
        <label
          htmlFor={nameKey}
          className="absolute top-[-15px] left-[20px] bg-white text-gray-400 font-semibold  px-1 animate-slide-top-sm"
        >
          {placeholder}
        </label>
      )}
      <input
        type={type || 'text'}
        className="bg-white border border-gray-300 text-gray-900 rounded-lg  w-full p-2.5 outline-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          setValue((prev) => ({ ...prev, [nameKey]: e.target.value }))
        }
      />
    </div>
  );
};

export default InputField;
