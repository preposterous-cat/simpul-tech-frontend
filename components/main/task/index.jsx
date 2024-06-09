import TaskArea from "./task-area";
import { TaskProvider } from "./task-context";

const Task = () => {
  return (
    <TaskProvider>
      <TaskArea />
    </TaskProvider>
  );
};

export default Task;
