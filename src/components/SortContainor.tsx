import { Task, useTaskStore } from "../store/taskStore";
import { useState } from "react";

export const SortContainor = () => {
  const [selectedPriority, setSelectedPriority] = useState("");
  const setTasks = useTaskStore((state) => state.setTasks); // Assuming you have a setTasks function in your store
  const tasks = useTaskStore((state) => state.tasks); // Assuming you have a setTasks function in your store

  const handleChange = (event) => {
    const priority = event.target.value;
    setSelectedPriority(priority);

    const priorityOrder = {
      "p1": 1,
      "p2": 2,
      "p3": 3,
      "p4": 4,
    };

    if (priority === "priority") {
      const sortedTasks: Task[] = tasks.slice().sort((a: Task, b: Task) => {
        const priorityA = priorityOrder[a.priority];
        const priorityB = priorityOrder[b.priority];

        return priorityA - priorityB;
      });

      setTasks(sortedTasks);
    }
    else if (priority === "date") {
      const sortedTasks = tasks.slice().sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });
      setTasks(sortedTasks);
    }
    else{
      setTasks(JSON.parse(localStorage.getItem("tasks") as string))
    }

  };

  return (
    <div className="flex gap-3 items-center">
      <span className="text-xl w-12">Sort:</span>
      <select
        id="selector"
        name="priority"
        className="w-[25%]"
        value={selectedPriority}
        onChange={handleChange}
      >
        <option value="">Select...</option>
        <option value="priority">Priority</option>
        <option value="date">Date</option>
      </select>
    </div>
  );
};
