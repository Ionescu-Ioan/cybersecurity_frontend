import React from "react";

function InteractiveButton({ ownedMovie, handleGoToMovie, handleBuy }) {
  return (
    <div className="div_interactive_button">
      {ownedMovie ? (
        <button onClick={handleGoToMovie}>Go to movie</button>
      ) : (
        <button onClick={handleBuy}>Buy</button>
      )}
    </div>
  );
}

export default InteractiveButton;
