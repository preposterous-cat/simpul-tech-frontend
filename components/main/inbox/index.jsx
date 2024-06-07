import { InboxProvider } from "./inbox-context";
import InboxHome from "./inbox-home";

const Inbox = () => {
  return (
    <InboxProvider>
      <InboxHome />
    </InboxProvider>
  );
};

export default Inbox;
