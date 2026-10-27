import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCheck, FiEye, FiMoreVertical } from "react-icons/fi";

const base = "milestoneRecords";
const MENU_WIDTH = 208;

const RowMenu = ({ statuses, current, onView, onStatusChange }) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!position) return undefined;
    const close = () => setPosition(null);
    const handlePointer = (event) => {
      if (!menuRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) close();
    };
    const handleKey = (event) => event.key === "Escape" && close();
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    window.addEventListener("resize", close);
    window.addEventListener("scroll", close, true);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
      window.removeEventListener("resize", close);
      window.removeEventListener("scroll", close, true);
    };
  }, [position]);

  const toggle = () => {
    if (position) {
      setPosition(null);
      return;
    }
    const rect = buttonRef.current.getBoundingClientRect();
    const openUp = rect.bottom + 220 > window.innerHeight;
    setPosition({
      left: Math.max(rect.right - MENU_WIDTH, 8),
      ...(openUp ? { bottom: window.innerHeight - rect.top + 4 } : { top: rect.bottom + 4 }),
    });
  };

  const select = (callback) => {
    setPosition(null);
    callback();
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={Boolean(position)}
        aria-label={t(`${base}.menu.label`)}
        className="inline-flex h-7 w-7 items-center justify-center rounded-sm text-white/60 transition hover:bg-white/10 hover:text-white"
      >
        <FiMoreVertical />
      </button>
      {position && (
        <ul
          ref={menuRef}
          role="menu"
          style={{ ...position, width: MENU_WIDTH }}
          className="fixed z-50 overflow-hidden rounded-sm bg-white py-1 text-left text-[11px] text-primary shadow-xl"
        >
          <li role="none">
            <button type="button" role="menuitem" onClick={() => select(onView)} className="flex w-full items-center gap-2 px-3 py-2 hover:bg-black/5">
              <FiEye /> {t(`${base}.menu.seeDetails`)}
            </button>
          </li>
          <li role="none" className="mt-1 border-t border-black/10 px-3 pb-1 pt-2 text-[9px] uppercase tracking-wider text-black/45">
            {t(`${base}.menu.deliveryStatus`)}
          </li>
          {statuses.map((status) => (
            <li key={status} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={status === current}
                onClick={() => select(() => onStatusChange(status))}
                className={`flex w-full items-center justify-between gap-2 px-3 py-2 hover:bg-black/5 ${status === current ? "bg-btn-primary/30" : ""}`}
              >
                {t(`${base}.delivery.${status}`)}
                {status === current && <FiCheck />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default RowMenu;
