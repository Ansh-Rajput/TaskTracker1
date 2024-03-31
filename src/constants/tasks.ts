import { Status } from "../store/taskStore";

export type TaskState = {
    state: Status;
    bgColor: string;
};

export const taskStates: TaskState[] = [
    { state: "Pending", bgColor: "bg-yellow-500" },
    { state: "In Progress", bgColor: "bg-blue-500" },
    { state: "Completed", bgColor: "bg-green-500" },
    { state: "Deployed", bgColor: "bg-purple-500" },
    { state: "Deffered", bgColor: "bg-red-500" }
];
