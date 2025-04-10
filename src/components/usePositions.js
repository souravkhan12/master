import React, { createContext, useContext, useEffect, useState } from "react";

const PositionContext = createContext();

function PositionProvider({ children }) {
  const [arr, setArr] = useState([]);
  const [start, setStart] = useState(false);
  const [idx, setIdx] = useState(0);
  const [rpt, setRepeat] = useState(false);

  function pushItems(newval) {
    const lableArr = newval.map((item) => item.label);
    setArr(lableArr);
  }

  return (
    <PositionContext.Provider
      value={{
        arr,
        setArr,
        pushItems,
        start,
        setStart,
        idx,
        setIdx,
        rpt,
        setRepeat,
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
