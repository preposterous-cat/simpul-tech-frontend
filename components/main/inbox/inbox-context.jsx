"use client";

import { createContext, useContext, useState } from "react";

const InboxContext = createContext();

export const useInboxContext = () => {
  return useContext(InboxContext);
};

export function InboxProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <InboxContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </InboxContext.Provider>
  );
}
