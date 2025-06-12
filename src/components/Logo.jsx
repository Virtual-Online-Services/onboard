import React from "react";
import allImages from "../constant/images";

const Logo = ({ isDarkTheme = false }) => {
  const logoSrc = isDarkTheme ? allImages.logowhite : allImages.logo;
  return (
    <div className="logo text-center mb-3">
      <img src={logoSrc} alt="Onboarder Logo" />
    </div>
  );
};

export default Logo;
