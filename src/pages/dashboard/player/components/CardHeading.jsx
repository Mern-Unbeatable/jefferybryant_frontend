const CardHeading = ({ eyebrow, title }) => (
  <div>
    <p className="text-xs uppercase tracking-[0.2em] text-btn-primary/80">{eyebrow}</p>
    <h2 className="mt-1.5 font-ethnocentric text-base uppercase sm:text-xl">{title}</h2>
  </div>
);

export default CardHeading;
