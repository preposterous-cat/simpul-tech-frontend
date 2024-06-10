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
  const { chatData, setIsOpenChat, setChatData, newReply, setNewReply } =
    useInboxContext();
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
          replyFrom: newReply ? newReply.replyMessage : "",
        },
      ],
    };

    setChatData(updatedChatData);
    setNewMessage("");
    setNewReply(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-fit">
      <div className="flex flex-row border-b-2 border-primary-foreground py-[24px] px-[32px] sticky top-0 bg-white z-10">
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

      <div className="grow px-[32px] py-[24px] overflow-auto flex flex-col gap-4">
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
                  <SenderChat
                    message={chat.message}
                    time={chat.time}
                    replyMessage={chat.replyFrom}
                  />
                ) : (
                  <PeopleChat
                    name={chat.name}
                    message={chat.message}
                    time={chat.time}
                    color={userColors[chat.name]}
                    roleKey={index}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-row gap-4 sticky bottom-0 bg-white z-10 py-5">
        {isSeparatorOutOfView && (
          <div className="absolute top-0 lg:right-56 lg:left-56 right-24 left-24 mb-2">
            <div className="bg-stickers-one shadow-md p-1 text-start text-primary w-36 rounded-lg">
              New Message
            </div>
          </div>
        )}

        {chatData?.group_name == "FastVisa Support" ? (
          <ConnectiongSupport />
        ) : (
          ""
        )}

        <div className="grow ps-[32px]">
          <div className="flex flex-col">
            {newReply ? (
              <ReplySection
                to={newReply?.replyTo}
                message={newReply?.replyMessage}
              />
            ) : (
              ""
            )}

            <Input
              className=" border-primary-foreground rounded-t-none focus-visible:ring-0 placeholder:text-black"
              type="text"
              placeholder="Type a new message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="pe-[32px] self-end">
          <Button className="text-white" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

const ConnectiongSupport = () => {
  return (
    <div className="absolute -top-8 mb-2 w-full ">
      <div className="bg-stickers-one shadow-md p-3 text-start text-primary mx-8 flex flex-row items-center gap-4">
        <svg
          className="animate-spin h-5 w-5 text-white"
          viewBox="0 0 50 50"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            stroke="blue"
          ></circle>

          {/* Spinning Circle */}
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
            stroke="currentColor"
            strokeDasharray="50"
            strokeDashoffset="0"
          ></circle>
        </svg>{" "}
        <p className="text-primary-background font-bold text-sm">
          Please wait while we connect you with one of our team
        </p>
      </div>
    </div>
  );
};

const ReplySection = ({ to, message }) => {
  const { closeReplyHandler } = useInboxContext();
  return (
    <div className="flex flex-col bg-primary-text border border-b-0 border-primary-foreground p-3 rounded-t-lg">
      <div className="flex flex-row justify-between ">
        <p className="text-sm font-bold">Replying to {to}</p>
        <FiX onClick={closeReplyHandler} />
      </div>
      <p className="text-sm">{message}</p>
    </div>
  );
};

const OptionChat = ({ isYou, replyHandler }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className=" ">
          <FiMoreHorizontal />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white border border-primary-foreground">
        <DropdownMenuGroup>
          {isYou ? (
            <>
              <DropdownMenuItem>
                <button className="text-primary">Edit</button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary-foreground" />
              <DropdownMenuItem>
                <button className="text-indicator-red">Delete</button>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <button className="text-primary">Share</button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary-foreground" />
              <DropdownMenuItem>
                <button className="text-primary" onClick={replyHandler}>
                  Reply
                </button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SenderChat = ({ message, time, replyMessage }) => (
  <div className="flex flex-col ">
    <Label className=" text-chats-purple font-bold mb-2 text-end">You</Label>

    {replyMessage != "" ? (
      <div className="flex flex-row-reverse self-end items-start gap-2 mb-2">
        <div className=" max-w-[500px] bg-primary-text text-start text-primary-background rounded-lg p-3 flex flex-col">
          <p>{replyMessage}</p>
        </div>
      </div>
    ) : (
      ""
    )}

    <div className="flex flex-row-reverse self-end items-start gap-2">
      <div className=" max-w-[500px] bg-chats-lightpurple text-start text-primary-background rounded-lg p-3 flex flex-col">
        <p>{message}</p>
        <p className="mt-1" style={{ fontSize: "12px" }}>
          {time}
        </p>
      </div>
      <OptionChat isYou={true} />
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

const PeopleChat = ({ name, message, time, color, roleKey }) => {
  const { replyHandler } = useInboxContext();
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
        <OptionChat
          isYou={false}
          replyHandler={() => replyHandler(name, message, roleKey)}
        />
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
