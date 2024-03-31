import { create } from "zustand";
import { v4 as uuid } from "uuid";
// import { persist } from "zustand/middleware";

export type Status =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Deployed"
  | "Deffered";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: string;
  team: string;
  assignee: string;
  startDate: Date;
  endDate?: Date;
};

export type State = {
  tasks: Task[];
};

export type Actions = {
  addTask: (
    title: string,
    description: string,
    team: string,
    priority: string,
    assignee: string
  ) => void;
  removeTask: (id: string) => void;
  setTasks: (tasks: Task[]) => void;
  updateTask: (title: string, status: Status, priority: string) => void;
};

export const useTaskStore = create<State & Actions>()((set) => ({
  tasks: JSON.parse(localStorage.getItem("tasks")!) || [],
  addTask: (title, description, team, priority, assignee) => {
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: uuid(),
          title,
          description,
          team,
          priority,
          assignee,
          status: "Pending",
          startDate: new Date(),
        },
      ],
    }));
  },
  removeTask: (id) =>
    set((state) => {
      const newTasks = state.tasks.filter((task) => {
        return task.id !== id;
      })
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return {
        tasks: newTasks,
      };
    }),
  updateTask: (id: string, status: Status, priority) =>
    set((state) => {
      const newTasks = state.tasks.map((task) =>
        task.id === id
          ? { ...task, status, priority, endDate: new Date() }
          : task
      );
      localStorage.setItem("tasks", JSON.stringify(newTasks));
      return {
        tasks: newTasks,
      };
    }),
  setTasks: (tasks) => set(() => ({ tasks })),
}));
