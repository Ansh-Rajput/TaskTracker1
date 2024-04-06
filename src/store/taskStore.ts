import { create } from "zustand";
import axios from "axios";
import { BASE_TASK_URL, priorityOrder } from "../constants/tasks";

export type Status =
  | "Pending"
  | "In Progress"
  | "Completed"
  | "Deployed"
  | "Deferred";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: Status;
  priority: keyof typeof priorityOrder;
  team: string;
  assignee: string;
  startDate: Date;
  endDate?: Date;
};

export type User = {
  googleId: string;
  displayName: string;
  email: string;
  image: string;
};

export type State = {
  tasks: Task[];
  user: User | null;
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
  setUser: (user: User | null) => void;
  updateTask: (id: string, status: Status, priority: string) => void;
};

export const useTaskStore = create<State & Actions>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  tasks: [],
  addTask: async (title, description, team, priority, assignee) => {
    try {
      const response = await axios.post(
        `${BASE_TASK_URL}/addTask`,
        {
          title,
          description,
          team,
          priority,
          assignee,
          status: "Pending",
          startDate: new Date(),
        },
        {
          withCredentials: true,
        }
      );
      set((state) => ({ tasks: [...state.tasks, response.data.task] }));
    } catch (error) {
      console.error("Error adding task:", error);
      // Handle error
    }
  },
  removeTask: async (id) => {
    try {
      await axios.delete(`${BASE_TASK_URL}/deleteTask/${id}`, {
        withCredentials: true,
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error
    }
  },
  updateTask: async (id: string, status: Status, priority: string) => {
    try {
      const response = await axios.put(
        `${BASE_TASK_URL}/updateTask/${id}`,
        {
          status,
          priority,
        },
        {
          withCredentials: true,
        }
      );
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? response.data.task : task
        ),
      }));
    } catch (error) {
      console.error("Error updating task:", error);
      // Handle error
    }
  },
  setTasks: (tasks) => set({ tasks }),
}));
