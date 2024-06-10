"use client";

import inboxHomeData from "@/data/inbox-home-data";
import { createContext, useContext, useState } from "react";

const InboxContext = createContext();

export const useInboxContext = () => {
  return useContext(InboxContext);
};

export function InboxProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [newReply, setNewReply] = useState(null);

  const replyHandler = (replyTo, replyMessage, replyIdx) => {
    const makeNewReply = {
      replyTo: replyTo,
      replyMessage: replyMessage,
      replyIdx: replyIdx,
    };
    setNewReply(makeNewReply);
  };

  const closeReplyHandler = () => {
    setNewReply(null);
  };

  return (
    <InboxContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isOpenChat,
        setIsOpenChat,
        chatData,
        setChatData,
        newReply,
        setNewReply,
        replyHandler,
        closeReplyHandler,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}
