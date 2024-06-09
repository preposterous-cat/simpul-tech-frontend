"use client";

import quicksData from "@/data/quicks-data";

import { createContext, useContext, useState } from "react";

const QuicksContext = createContext();

export const useQuicksContext = () => {
  return useContext(QuicksContext);
};

export function QuicksProvider({ children }) {
  const [isShowQuicks, setIsShowQuicks] = useState(false);
  const [quicks, setQuicks] = useState(quicksData);
  const [currentContent, setCurrentContent] = useState(-1);

  const showQuicks = () => setIsShowQuicks(true);

  const activateQuicks = (index) => {
    setQuicks((prevData) =>
      prevData.map((item, i) => ({
        ...item,
        isActive: i === index,
      }))
    );
    setCurrentContent(index);
  };

  const closeQuicks = () => {
    setCurrentContent(-1);
    setQuicks(quicksData);
    setIsShowQuicks(false);
  };

  return (
    <QuicksContext.Provider
      value={{
        isShowQuicks,
        setIsShowQuicks,
        quicks,
        setQuicks,
        showQuicks,
        activateQuicks,
        closeQuicks,
        currentContent,
        setCurrentContent,
      }}
    >
      {children}
    </QuicksContext.Provider>
  );
}
