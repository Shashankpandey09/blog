import { ChangeEvent } from "react";
interface LabelInputTypes {
  label: string;
  type?: string;
  placeholder: string;
  OnChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const LabelInputs = ({
  label,
  type,
  placeholder,
  OnChange,
}: LabelInputTypes) => {
  return (
    <>
      <label
        htmlFor={label}
        className="block mb-2 text-sm capitalize font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type || "text"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#FF6B6B] focus:border-[#FF6B6B] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#FF6B6B] dark:focus:border-[#FF6B6B]"
        placeholder={placeholder}
        required
        onChange={OnChange}
      />
    </>
  );
};
export default LabelInputs;
