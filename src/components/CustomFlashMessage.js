import React from "react";

const CustomFlashMessage = ({ message, customClassName }) => {
  return <div className={customClassName}>{message}</div>;
};

export default CustomFlashMessage;
