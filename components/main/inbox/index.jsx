import InboxArea from "./inbox-area";
import { InboxProvider } from "./inbox-context";
import InboxHome from "./inbox-home";

const Inbox = () => {
  return (
    <InboxProvider>
      <InboxArea />
    </InboxProvider>
  );
};

export default Inbox;
