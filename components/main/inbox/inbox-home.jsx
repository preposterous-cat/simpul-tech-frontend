"use client";

import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import Loading from "../loading";
import { useInboxContext } from "./inbox-context";
import { useEffect } from "react";

const InboxHome = () => {
  const { isLoading, setIsLoading } = useInboxContext();

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

  return (
    <div className="flex flex-col w-full">
      <div className="relative w-full">
        <Input
          className="py-0 px-10 border-black focus-visible:ring-0 h-7 placeholder:text-black" // Add padding to the right
          type="text"
          placeholder="Search"
        />
        <FiSearch className="absolute text-black right-10 top-1/2 transform -translate-y-1/2 text-primary-text" />
      </div>
      {isLoading ? (
        <Loading text={"Loading Chats..."} />
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row gap-4 py-[22px] border-b-2 border-black">
            <div>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.1755 0.0292358C7.39687 0.0292358 5.14629 2.27982 5.14629 5.05848C5.14629 7.83713 7.39687 10.0877 10.1755 10.0877C12.9542 10.0877 15.2048 7.83713 15.2048 5.05848C15.2048 2.27982 12.9542 0.0292358 10.1755 0.0292358ZM12.6901 5.0585C12.6901 3.67546 11.5585 2.54388 10.1755 2.54388C8.79244 2.54388 7.66086 3.67546 7.66086 5.0585C7.66086 6.44154 8.79244 7.57312 10.1755 7.57312C11.5585 7.57312 12.6901 6.44154 12.6901 5.0585ZM17.7193 17.6316C17.4678 16.7389 13.5702 15.117 10.1754 15.117C6.79327 15.117 2.92076 16.7263 2.63158 17.6316H17.7193ZM0.117004 17.6316C0.117004 14.2871 6.81847 12.6023 10.1755 12.6023C13.5325 12.6023 20.234 14.2871 20.234 17.6316V20.1462H0.117004V17.6316Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div>1920302193-awiudhauiwhdiahw</div>
              <div>Cameron philips:</div>
              <div>Please check dis out</div>
            </div>
            <div>January 1, 2024 19:10</div>
          </div>

          <div className="flex flex-row gap-4 py-[22px] border-b-2 border-black">
            <div>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10.1755 0.0292358C7.39687 0.0292358 5.14629 2.27982 5.14629 5.05848C5.14629 7.83713 7.39687 10.0877 10.1755 10.0877C12.9542 10.0877 15.2048 7.83713 15.2048 5.05848C15.2048 2.27982 12.9542 0.0292358 10.1755 0.0292358ZM12.6901 5.0585C12.6901 3.67546 11.5585 2.54388 10.1755 2.54388C8.79244 2.54388 7.66086 3.67546 7.66086 5.0585C7.66086 6.44154 8.79244 7.57312 10.1755 7.57312C11.5585 7.57312 12.6901 6.44154 12.6901 5.0585ZM17.7193 17.6316C17.4678 16.7389 13.5702 15.117 10.1754 15.117C6.79327 15.117 2.92076 16.7263 2.63158 17.6316H17.7193ZM0.117004 17.6316C0.117004 14.2871 6.81847 12.6023 10.1755 12.6023C13.5325 12.6023 20.234 14.2871 20.234 17.6316V20.1462H0.117004V17.6316Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <div>1920302193-awiudhauiwhdiahw</div>
              <div>Cameron philips:</div>
              <div>Please check dis out</div>
            </div>
            <div>January 1, 2024 19:10</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InboxHome;
