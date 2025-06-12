import allImages from "../constant/images";

const Icon = ({ name, className = "" }) => {
  const src = name === "checkmark" ? allImages.circle : "";
  return src ? <img src={src} alt={name} className={className} /> : null;
};

export default Icon;
