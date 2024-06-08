"use client";

import { useEffect } from "react";
import InboxChat from "./inbox-chat";
import { useInboxContext } from "./inbox-context";
import InboxHome from "./inbox-home";

const InboxArea = () => {
  const { isOpenChat, setIsLoading } = useInboxContext();

  useEffect(() => {
    // Set isLoading to true when component mounts
    setIsLoading(true);

    // After 2 seconds, set isLoading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return <>{isOpenChat ? <InboxChat /> : <InboxHome />}</>;
};

export default InboxArea;
