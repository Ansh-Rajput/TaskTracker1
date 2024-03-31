import { ChangeEvent, useState } from "react";
import { Task, useTaskStore } from "../store/taskStore";
import { HiMinus } from "react-icons/hi";

export const FilterContainor = () => {
  const [selectedPriority, setSelectedPriority] = useState("");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const setTasks = useTaskStore((state) => state.setTasks);
  const tasks = useTaskStore((state) => state.tasks);

  const handleChangePriority = (event: ChangeEvent<HTMLSelectElement>) => {
    const priority = event.target.value;
    setSelectedPriority(priority);

    if (priority === "") {
      setTasks(JSON.parse(localStorage.getItem("tasks") as string));
      return;
    }

    const newTasks: Task[] = tasks.slice().filter((task) => {
      return task.priority === priority;
    });

    setTasks(newTasks);
  };
  const handleChangeAssignee = (event: ChangeEvent<HTMLInputElement>) => {
    const assigneeName = event.target.value;
    setAssigneeFilter(assigneeName);

    if (assigneeName === "") {
      setTasks(JSON.parse(localStorage.getItem("tasks") as string));
      return;
    }

    const newTasks: Task[] = tasks.slice().filter((task) => {
      return task.assignee.toLowerCase().includes(assigneeName.toLowerCase());
    });

    setTasks(newTasks);
  };
  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }

    const newTasks: Task[] = tasks.slice().filter((task) => {
      if (!startDate || !endDate){
        setTasks(JSON.parse(localStorage.getItem("tasks") as string));
        return;
      }
      const taskDate = new Date(task.startDate);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      return taskDate >= startDateObj && taskDate <= endDateObj;
    });

    setTasks(newTasks);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-3 justify-center items-center">
      <span className="text-xl w-12">Filters:</span>
      <div className="space-x-2 flex flex-col gap-3 justify-center items-center md:flex-row">
        <input
          type="text"
          placeholder="Assignee name"
          className="shadow-md w-full p-1 rounded-sm ml-[8px]"
          value={assigneeFilter}
          onChange={handleChangeAssignee}
        />
        <select
          id="selector"
          name="priority"
          className="shadow-md w-full p-1 rounded-sm"
          value={selectedPriority}
          onChange={handleChangePriority}
        >
          <option value="">Priority...</option>
          <option value="p1">p1</option>
          <option value="p2">p2</option>
          <option value="p3">p3</option>
          <option value="p4">p4</option>
        </select>
        <div className="bg-white space-x-2 flex items-center shadow-md w-full ">
          <input
            type="date"
            name="startDate"
            id="startDate"
            className="p-1 rounded-sm"
            placeholder="Start Date"
            value={startDate}
            onChange={handleChangeDate}
          />
          <span><HiMinus className="inline-block" /></span>
          <input
            type="date"
            name="endDate"
            id="endDate"
            placeholder="End Date"
            className="p-1 rounded-sm"
            value={endDate}
            onChange={handleChangeDate}
          />
        </div>
      </div>
    </div>
  );
};
