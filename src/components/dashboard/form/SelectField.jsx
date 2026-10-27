import { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { inputClass } from "@/components/dashboard/form/formStyles";

const SelectField = ({ id, name, value, options, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    if (!open) return undefined;
    const handlePointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const choose = (nextValue) => {
    onChange(name, nextValue);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={`${inputClass} flex items-center justify-between gap-3 text-left`}
      >
        <span className={selected ? "" : "text-white/30"}>{selected?.label ?? placeholder}</span>
        <FiChevronDown className={`shrink-0 text-white/50 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-labelledby={id}
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-sm border border-white/10 bg-white py-1 shadow-xl"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  onClick={() => choose(option.value)}
                  className={`w-full px-3 py-2 text-left text-xs transition ${
                    isSelected ? "bg-btn-primary text-primary" : "text-primary hover:bg-black/5"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SelectField;
