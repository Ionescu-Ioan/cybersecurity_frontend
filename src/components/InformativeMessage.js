import React, { useEffect } from "react";

function createMarkup(message) {
  return { __html: "You attempted to add " + message + " $" };
}

const InformativeMessage = ({ message, customClassName }) => {
  return (
    <div
      className={customClassName}
      dangerouslySetInnerHTML={createMarkup(message)}
    ></div>
  );
};

export default InformativeMessage;
