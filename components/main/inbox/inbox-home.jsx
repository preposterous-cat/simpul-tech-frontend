"use client";

import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import Loading from "../loading";
import { useInboxContext } from "./inbox-context";
import { useEffect } from "react";
import inboxHomeData from "@/data/inbox-home-data";
import { Button } from "@/components/ui/button";

const InboxHome = () => {
  const { isLoading, setIsOpenChat, setChatData } = useInboxContext();

  const openChatHandler = (index) => {
    setIsOpenChat(true);
    setChatData(inboxHomeData[index]);
  };

  // Data dummy untuk loop sebanyak 5 kali
  const dummyData = new Array(5).fill(null);

  return (
    <div className="flex flex-col py-[24px] px-[32px]">
      <div className="relative w-full">
        <Input
          className="py-0 px-10 border-primary-foreground focus-visible:ring-0 h-7 placeholder:text-black" // Add padding to the right
          type="text"
          placeholder="Search"
        />
        <FiSearch className="absolute text-black right-10 top-1/2 transform -translate-y-1/2" />
      </div>
      {isLoading ? (
        <Loading text={"Loading Chats..."} />
      ) : (
        <div className="flex flex-col ">
          {inboxHomeData?.map((item, idx) => (
            <button
              className="flex justify-between border-b-2 border-primary-foreground text-start"
              key={idx}
              onClick={() => openChatHandler(idx)}
            >
              <div className="flex flex-row gap-x-4 gap-y-0 py-[22px]">
                <AvatarIcon />
                <GroupInfo
                  groupName={item.group_name}
                  lastPerson={item.last_person}
                  lastChat={item.last_chat}
                  lastDateTime={item.last_date_time}
                />
              </div>
              <div className="self-center">
                {item.isNewChat ? (
                  <div className=" bg-indicator-red p-1 rounded-full ">
                    {""}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const GroupInfo = ({ groupName, lastPerson, lastChat, lastDateTime }) => (
  <div className="flex flex-col ">
    <div className="flex flex-row gap-3 items-center">
      <div className="text-primary font-bold" style={{ fontSize: "16px" }}>
        {groupName}
      </div>
      <div
        className="text-primary-background font-normal"
        style={{ fontSize: "15px" }}
      >
        {lastDateTime}
      </div>
    </div>

    <div
      className="text-primary-background font-bold"
      style={{ fontSize: "14px" }}
    >
      {lastPerson}
    </div>
    <div
      className="text-primary-foreground font-normal truncate lg:max-w-[400px] max-w-[200px]"
      style={{ fontSize: "14px" }}
    >
      {lastChat}
    </div>
  </div>
);

const AvatarIcon = () => (
  <div className="relative inline-block mt-1">
    <div className="relative bg-primary z-10 rounded-full p-3 ms-5">
      <svg
        width="15"
        height="15"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.1755 0.0292358C7.39687 0.0292358 5.14629 2.27982 5.14629 5.05848C5.14629 7.83713 7.39687 10.0877 10.1755 10.0877C12.9542 10.0877 15.2048 7.83713 15.2048 5.05848C15.2048 2.27982 12.9542 0.0292358 10.1755 0.0292358ZM12.6901 5.0585C12.6901 3.67546 11.5585 2.54388 10.1755 2.54388C8.79244 2.54388 7.66086 3.67546 7.66086 5.0585C7.66086 6.44154 8.79244 7.57312 10.1755 7.57312C11.5585 7.57312 12.6901 6.44154 12.6901 5.0585ZM17.7193 17.6316C17.4678 16.7389 13.5702 15.117 10.1754 15.117C6.79327 15.117 2.92076 16.7263 2.63158 17.6316H17.7193ZM0.117004 17.6316C0.117004 14.2871 6.81847 12.6023 10.1755 12.6023C13.5325 12.6023 20.234 14.2871 20.234 17.6316V20.1462H0.117004V17.6316Z"
          fill="white"
        />
      </svg>
    </div>
    <div className="absolute z-0 bg-primary-text rounded-full p-3 transform -translate-x-13 -translate-y-10">
      <svg
        width="15"
        height="15"
        viewBox="0 0 21 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.1755 0.0292358C7.39687 0.0292358 5.14629 2.27982 5.14629 5.05848C5.14629 7.83713 7.39687 10.0877 10.1755 10.0877C12.9542 10.0877 15.2048 7.83713 15.2048 5.05848C15.2048 2.27982 12.9542 0.0292358 10.1755 0.0292358ZM12.6901 5.0585C12.6901 3.67546 11.5585 2.54388 10.1755 2.54388C8.79244 2.54388 7.66086 3.67546 7.66086 5.0585C7.66086 6.44154 8.79244 7.57312 10.1755 7.57312C11.5585 7.57312 12.6901 6.44154 12.6901 5.0585ZM17.7193 17.6316C17.4678 16.7389 13.5702 15.117 10.1754 15.117C6.79327 15.117 2.92076 16.7263 2.63158 17.6316H17.7193ZM0.117004 17.6316C0.117004 14.2871 6.81847 12.6023 10.1755 12.6023C13.5325 12.6023 20.234 14.2871 20.234 17.6316V20.1462H0.117004V17.6316Z"
          fill="gray"
        />
      </svg>
    </div>
  </div>
);

export default InboxHome;
