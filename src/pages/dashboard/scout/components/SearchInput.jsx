import { FiSearch } from "react-icons/fi";
import { inputClass } from "@/components/dashboard/form/formStyles";

const SearchInput = ({ value, onChange, placeholder }) => (
  <label className="relative block">
    <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      aria-label={placeholder}
      className={`${inputClass} pl-9`}
    />
  </label>
);

export default SearchInput;
