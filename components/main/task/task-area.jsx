"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiClock,
  FiEdit,
  FiEdit2,
  FiMoreHorizontal,
} from "react-icons/fi";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import Loading from "../loading";
import { useTaskContext } from "./task-context";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineEdit } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const TaskArea = () => {
  const {
    isLoading,
    setIsLoading,
    isCollapse,
    collapseHandler,
    checkedHandler,
    isEditing,
    editingHandler,
    taskList,
    setTaskList,
    newDesc,
    newDescHandler,
    changeDescHandler,
    addNewTask,
  } = useTaskContext();

  const setDate = (index, newDate) => {
    setTaskList((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, date: newDate } : item
      )
    );
  };

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className="flex flex-col py-[24px] px-[32px]">
      <div className="flex justify-between md:ps-20 w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex border border-primary-foreground rounded-lg py-2 px-5 font-bold">
              My Task <FiChevronDown className="self-end" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white ms-24">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <button className=" text-primary-background font-bold pe-24">
                  Personal Errands
                </button>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-primary-foreground" />
              <DropdownMenuItem>
                <button className="text-primary-background font-bold">
                  Urgent To-Do
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button className="text-white" onClick={addNewTask}>
          New Task
        </Button>
      </div>
      {isLoading ? (
        <Loading text={"Loading Task List..."} />
      ) : (
        <div className="flex flex-col">
          {taskList?.map((item, i) => (
            <Collapsible
              key={i}
              className="flex justify-between border-b border-primary-foreground text-start"
            >
              <div className="flex flex-col w-full py-[22px]">
                <div
                  className={`flex justify-between ${
                    item.title != "" ? "items-start" : "items-center"
                  } w-full gap-4`}
                >
                  <Checkbox
                    onCheckedChange={() => checkedHandler(i)}
                    checked={item.isChecked}
                    className="rounded-none border-primary-foreground border-2 bg-transparent data-[state=checked]:bg-transparent data-[state=checked]:text-primary-foreground data-[state=checked]:font-bold"
                  />

                  {item.title != "" ? (
                    <h4
                      className={`text-sm font-semibold ${
                        item.isChecked
                          ? "text-primary-foreground line-through"
                          : "text-primary-background"
                      } grow`}
                    >
                      {item.title}
                    </h4>
                  ) : (
                    <Input
                      className="border-primary-foreground placeholder:text-primary-background me-32"
                      placeholder="Type Task Title"
                    />
                  )}

                  {item.remain_days != "" ? (
                    <div className="text-indicator-red text-sm ">
                      {item.remain_days} Days Left
                    </div>
                  ) : (
                    ""
                  )}

                  {item.date != "" ? (
                    <div className="text-primary-background text-sm">
                      {format(item.date, "dd/MM/yyyy")}
                    </div>
                  ) : (
                    ""
                  )}

                  <CollapsibleTrigger className="self-start" asChild>
                    <button onClick={collapseHandler}>
                      {isCollapse ? <FiChevronUp /> : <FiChevronDown />}
                    </button>
                  </CollapsibleTrigger>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className=" ">
                        <FiMoreHorizontal />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-primary-foreground me-14">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <button className="text-indicator-red">Delete</button>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <CollapsibleContent className="flex flex-col pt-1 pb-0 px-8 gap-4">
                  <div className="flex flex-row gap-4">
                    <FiClock
                      className={`self-center ${
                        item.date != ""
                          ? "text-primary"
                          : "text-primary-background"
                      }`}
                    />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "justify-between gap-8 text-start font-normal border border-primary-foreground rounded-sm text-primary-background",
                            item.date != "" && "text-muted-foreground"
                          )}
                        >
                          {item.date != "" ? (
                            format(item.date, "dd/MM/yyyy")
                          ) : (
                            <span>Set Date</span>
                          )}
                          <FiCalendar className="me-2 h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 md:ms-96">
                        <Calendar
                          className={` bg-white`}
                          mode="single"
                          selected={item.date}
                          onSelect={(date) => setDate(i, date)}
                          initialFocus
                          showOutsideDays={false}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-row gap-4">
                    <MdOutlineEdit
                      className={`self-center ${
                        item.desc != ""
                          ? "text-primary"
                          : "text-primary-background"
                      } text-lg`}
                      onClick={editingHandler}
                    />
                    {isEditing ? (
                      <textarea
                        onChange={newDescHandler}
                        onBlur={() => changeDescHandler(i)}
                        style={{ resize: "none" }}
                        className="border border-primary-text rounded-sm py-1 px-3 w-full text-wrap max-w-full max-h-[300px]"
                        defaultValue={item.desc}
                      ></textarea>
                    ) : (
                      <p onClick={editingHandler}>
                        {item.desc != "" ? item.desc : "No Description"}
                      </p>
                    )}
                  </div>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskArea;
