const sizes = {
  sm: { globe: "h-10", text: "h-7" },
  md: { globe: "h-14", text: "h-9" },
};

const Logo = ({ size = "sm", stacked = false, className = "" }) => {
  const { globe, text } = sizes[size];

  return (
    <span
      className={`flex items-center ${stacked ? "flex-col gap-1" : "gap-2"} ${className}`}
    >
      <img src="/logo/cfitGlobe.png" alt="" className={`${globe} w-auto`} />
      <img src="/logo/cfitText.png" alt="CFit Talent" className={`${text} w-auto`} />
    </span>
  );
};

export default Logo;
