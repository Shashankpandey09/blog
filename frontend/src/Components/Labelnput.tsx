import { ChangeEvent } from "react";

interface LabelInputTypes {
  label: string;
  type?: string;
  placeholder: string;
  name:string;
  inputClassName: string;
  OnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const LabelInputs = ({
  label,
  type,
  placeholder,
  name,
  OnChange,
  inputClassName
}: LabelInputTypes) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block mb-2 text-sm capitalize font-medium text-[#D9D9D9]"
      >
        {label}
      </label>

<input
  type={type || "text"}
  className={`bg-[#333333] font-mono border-2 w-full border-[#d4a373] text-[#E5E5E5] 
             text-lg rounded-none p-3 focus:outline-none 
            focus:border-[#E6B280] ${inputClassName}`}
  placeholder={placeholder}
  name={name}
  required
  onChange={OnChange}
/>
    </>
  );
};

export default LabelInputs;