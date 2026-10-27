import { useEffect, useRef } from "react";

const Modal = ({ open, onClose, labelledBy, className = "max-w-lg", children }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className={`max-h-[85svh] w-full overflow-y-auto rounded-xl border border-white/10 bg-[#161b1f] shadow-2xl outline-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
