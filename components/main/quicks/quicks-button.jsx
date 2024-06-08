import { useState } from "react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { useQuicksContext } from "./quicks-context";

const QuicksButton = ({ keyProp, label, svgIcon, activatedBg, isActive }) => {
  const { isShowQuicks, closeQuicks, activateQuicks } = useQuicksContext();
  return (
    <div
      className={`${
        !isShowQuicks ? "hidden" : ""
      } flex flex-col text-center gap-2`}
    >
      <Label className="text-white font-bold">{label}</Label>
      <div className="relative inline-block">
        <Button
          onClick={closeQuicks}
          className={`${
            !isActive ? "hidden" : ""
          } absolute z-0 rounded-full p-6 bg-zinc-500 transform -translate-x-3`}
        >
          {""}
        </Button>
        <Button
          className={`relative z-10 rounded-full py-6 px-4 ${
            isActive
              ? (() => {
                  switch (keyProp) {
                    case 0:
                      return "bg-indicator-blue";
                    case 1:
                      return "bg-indicator-orange";
                    default:
                      return ""; // Return null if no valid case is matched
                  }
                })()
              : "bg-white"
          }`}
          onClick={() => activateQuicks(keyProp)}
        >
          {svgIcon}
        </Button>
      </div>
    </div>
  );
};

export default QuicksButton;
