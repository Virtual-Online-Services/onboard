import React from "react";

const Container = ({ children, isDarkTheme = false }) => {
  return (
    <div className={isDarkTheme ? "dark-theme" : ""}>
      <div className="container">{children}</div>
    </div>
  );
};

export default Container;
