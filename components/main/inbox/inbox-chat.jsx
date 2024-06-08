import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiChevronLeft, FiX } from "react-icons/fi";
import { useInboxContext } from "./inbox-context";
import { Input } from "@/components/ui/input";

const InboxChat = ({ groupName }) => {
  const { chatData, setIsOpenChat, setChatData } = useInboxContext();

  const closeChatHandler = () => {
    setIsOpenChat(false);
    setChatData(null);
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
      <div className="grow px-[32px] h-[350px] max-h-[350px] overflow-auto">
        Chat
      </div>
      <div className="flex flex-row gap-4">
        <div className="grow ps-[32px]">
          <Input
            className=" border-primary-foreground focus-visible:ring-0 placeholder:text-black" // Add padding to the right
            type="text"
            placeholder="Type a new message"
          />
        </div>
        <div className="pe-[32px]">
          <Button className="text-white">Send</Button>
        </div>
      </div>
    </div>
  );
};

export default InboxChat;
