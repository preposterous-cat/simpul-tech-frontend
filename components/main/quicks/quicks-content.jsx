import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import Inbox from "../inbox";
import Task from "../task";
import { useQuicksContext } from "./quicks-context";

const QuicksContent = () => {
  const { currentContent } = useQuicksContext();
  return (
    <div>
      <Card
        className={`${
          currentContent < 0 ? "hidden" : ""
        } lg:w-[550px] w-[350px] bg-white me-5 py-[24px] px-[32px]`}
      >
        <CardContent>
          {(() => {
            switch (currentContent) {
              case 0:
                return <Inbox />;
              case 1:
                return <Task />;
              default:
                return null; // Return null if no valid case is matched
            }
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuicksContent;
