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
        } md:w-[650px] w-[340px] h-[430px] bg-white mx-5 overflow-auto`}
      >
        <CardContent>
          {(() => {
            switch (currentContent) {
              case 0:
                return <Inbox />;
              case 1:
                return <Task />;
              default:
                return null;
            }
          })()}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuicksContent;
