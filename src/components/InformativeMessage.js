import React, { useEffect } from "react";

function createMarkup(message) {
  return { __html: message };
}

const InformativeMessage = ({ message, customClassName }) => {
  //   useEffect = () => {
  //     console.log(message);
  //     console.log(createMarkup(message));
  //   };
  return (
    <div
      className={customClassName}
      dangerouslySetInnerHTML={createMarkup(message)}
    ></div>
  );
};

export default InformativeMessage;
