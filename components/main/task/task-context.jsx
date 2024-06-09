"use client";

import taskListData from "@/data/task-list-data";

const { createContext, useContext, useState } = require("react");

const TaskContext = createContext();

export const useTaskContext = () => {
  return useContext(TaskContext);
};

export function TaskProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapse, setIsCollapse] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [taskList, setTaskList] = useState(taskListData);
  const [newDesc, setNewDesc] = useState("");

  const collapseHandler = () => {
    setIsCollapse(!isCollapse);
  };

  const checkedHandler = (index) => {
    setTaskList((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const newDescHandler = (e) => {
    setNewDesc(e.target.value);
  };

  const changeDescHandler = (index) => {
    setTaskList((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, desc: newDesc } : item
      )
    );
    setIsEditing(false);
    setNewDesc("");
  };

  const editingHandler = () => {
    setIsEditing(!isEditing);
  };

  const addNewTask = () => {
    const newTask = {
      title: "",
      remain_days: "",
      date: "",
      desc: "",
      isChecked: false,
    };

    setTaskList((prevData) => [...prevData, newTask]);
  };

  return (
    <TaskContext.Provider
      value={{
        taskList,
        setTaskList,
        isLoading,
        setIsLoading,
        isCollapse,
        setIsCollapse,
        isEditing,
        setIsEditing,
        newDesc,
        newDescHandler,
        collapseHandler,
        checkedHandler,
        editingHandler,
        changeDescHandler,
        addNewTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
