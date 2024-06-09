import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiMoreHorizontal, FiX } from "react-icons/fi";
import { useInboxContext } from "./inbox-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { format, isToday } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import userColors from "@/data/user-colors";

const InboxChat = ({ groupName }) => {
  const { chatData, setIsOpenChat, setChatData } = useInboxContext();
  const [isSeparatorOutOfView, setIsSeparatorOutOfView] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const closeChatHandler = () => {
    setIsOpenChat(false);
    setChatData(null);
  };

  // Mengelompokkan chats berdasarkan tanggal
  const groupedChats = chatData?.chats?.reduce((acc, chat) => {
    const date = chat.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(chat);
    return acc;
  }, {});

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const currentDate = new Date()
      .toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
      .split(",")[0];
    const currentTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
    });

    const updatedChatData = {
      ...chatData,
      chats: [
        ...(chatData.chats || []),
        {
          name: "You",
          message: newMessage,
          date: currentDate,
          time: currentTime,
          isReaded: true,
        },
      ],
    };

    setChatData(updatedChatData);
    setNewMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-stretch">
      <div className="flex flex-row border-b-2 border-primary-foreground py-[24px] px-[32px]">
        <Button className="bg-transparent" onClick={closeChatHandler}>
          <FiArrowLeft
            className=" font-extrabold text-black"
            style={{ fontSize: "24px" }}
          />
        </Button>

        <div className="flex flex-col grow">
          <div className="text-primary font-bold" style={{ fontSize: "16px" }}>
            {chatData?.group_name}
          </div>
          <div style={{ fontSize: "12px" }}>3 Participants</div>
        </div>

        <Button className="bg-transparent" onClick={closeChatHandler}>
          <FiX className="text-black" style={{ fontSize: "24px" }} />
        </Button>
      </div>

      <div className="grow px-[32px] py-[24px] h-[350px] max-h-[350px] overflow-auto flex flex-col gap-4">
        {Object.keys(groupedChats).map((date) => (
          <React.Fragment key={date}>
            <DateSeparator date={date} />
            {groupedChats[date].map((chat, index) => (
              <div key={`${date}-${index}`}>
                {!chat.isReaded ? (
                  <NewMessageSeparator onOutOfView={setIsSeparatorOutOfView} />
                ) : (
                  ""
                )}
                {chat.name === "You" ? (
                  <SenderChat message={chat.message} time={chat.time} />
                ) : (
                  <PeopleChat
                    name={chat.name}
                    message={chat.message}
                    time={chat.time}
                    color={userColors[chat.name]}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-row gap-4 relative">
        {isSeparatorOutOfView && (
          <div className="absolute bottom-10 lg:right-56 lg:left-56 right-24 left-24 mb-2">
            <div className="bg-stickers-one shadow-md p-1 text-start text-primary w-36 rounded-lg">
              New Message
            </div>
          </div>
        )}
        <div className="grow ps-[32px]">
          <Input
            className=" border-primary-foreground focus-visible:ring-0 placeholder:text-black"
            type="text"
            placeholder="Type a new message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="pe-[32px]">
          <Button className="text-white" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

const OptionChat = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button className=" ">
        <FiMoreHorizontal />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white border border-primary-foreground">
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <button className="text-primary">Edit</button>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-primary-foreground" />
        <DropdownMenuItem>
          <button className="text-indicator-red">Delete</button>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SenderChat = ({ message, time }) => (
  <div className="flex flex-col ">
    <Label className=" text-chats-purple font-bold mb-2 text-end">You</Label>
    <div className="flex flex-row-reverse self-end items-start gap-2">
      <div className=" max-w-[500px] bg-chats-lightpurple text-start text-primary-background rounded-lg p-3 flex flex-col">
        <p>{message}</p>
        <p className="mt-1" style={{ fontSize: "12px" }}>
          {time}
        </p>
      </div>
      <OptionChat />
    </div>
  </div>
);

const DateSeparator = ({ date }) => {
  const isTodayDate = isToday(new Date(date));

  return (
    <div className="flex flex-row">
      <Separator
        orientation="vertical"
        className="grow border-primary-foreground h-[1px] self-center"
        style={{ borderWidth: "1px" }}
      />
      <p className="mx-5">
        {isTodayDate ? `Today` : ``} {format(new Date(date), "MMMM d, yyyy")}
      </p>
      <Separator
        orientation="vertical"
        className="grow border-primary-foreground h-[1px] self-center"
        style={{ borderWidth: "1px" }}
      />
    </div>
  );
};

const PeopleChat = ({ name, message, time, color }) => {
  return (
    <div className="flex flex-col ">
      <Label
        className={`font-bold mb-2 text-start`}
        style={{ color: `var(${color[0]})` }}
      >
        {name}
      </Label>
      <div className="flex flex-row self-start items-start gap-2">
        <div
          className={` max-w-[500px] text-start text-primary-background rounded-lg p-3 flex flex-col`}
          style={{ backgroundColor: `var(${color[1]})` }}
        >
          <p>{message}</p>
          <p className="mt-1" style={{ fontSize: "12px" }}>
            {time}
          </p>
        </div>
        <OptionChat />
      </div>
    </div>
  );
};

const NewMessageSeparator = ({ onOutOfView }) => {
  const separatorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (onOutOfView) {
          onOutOfView(!entry.isIntersecting);
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = separatorRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onOutOfView]);

  return (
    <>
      <div className="flex flex-row" ref={separatorRef}>
        <Separator
          orientation="vertical"
          className="grow border-indicator-red h-[1px] self-center"
          style={{ borderWidth: "1px" }}
        />
        <p className="mx-5 text-indicator-red">New Message</p>
        <Separator
          orientation="vertical"
          className="grow border-indicator-red h-[1px] self-center"
          style={{ borderWidth: "1px" }}
        />
      </div>
    </>
  );
};

export default InboxChat;
