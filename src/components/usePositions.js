import React, { createContext, useContext, useState } from "react";

const PositionContext = createContext();

function PositionProvider({ children }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [rotateLeft, setRotateLeft] = useState(0);
  const [rotateRight, setRotateRight] = useState(0);

  const handleXChange = (value) => {
    setX((prevX) => prevX + value);
  };

  const handleYChange = (value) => {
    setY((prevY) => prevY + value);
  };
  const handleRotateLeft = (value) => {
    setRotateLeft((prevRotateLeft) => prevRotateLeft + value);
  };

  const handleRotateRight = (value) => {
    setRotateRight((prevRotateRight) => prevRotateRight + value);
  };

  return (
    <PositionContext.Provider
      value={{
        x,
        handleXChange,
        y,
        handleYChange,
        rotateLeft,
        handleRotateLeft,
        rotateRight,
        handleRotateRight,
      }}
    >
      {children}
    </PositionContext.Provider>
  );
}

function usePositions() {
  const context = useContext(PositionContext);
  if (context == undefined) {
    throw new Error("Context was used outside");
  }
  return context;
}

export { PositionProvider, usePositions };
