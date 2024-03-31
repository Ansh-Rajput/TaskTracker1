import { IoMdMore } from "react-icons/io";
import { cn } from "../lib/utils";
import { Status, useTaskStore } from "../store/taskStore";
import { useEffect, useRef, useState } from "react";
import { DeleteTaskModal } from "./modals/DeleteTaskModal";
import { EditTaskModal } from "./modals/EditTaskModal copy";

interface TaskStateContainorProps {
  status: Status;
  bgColor?: string;
}
export const TaskStateContainor = ({
  status,
  bgColor,
}: TaskStateContainorProps) => {
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <div className="w-full min-h-full shadow-md rounded-lg flex md:flex-col">
      <h2
        className={cn(
          "text-lg text-white p-2 text-center rounded-t-md",
          bgColor ? bgColor : "bg-slate-600"
        )}
      >
        {status}
      </h2>
      <div className=" p-4 space-y-3 md:flex-1 overflow-y-scroll hideScrollBar">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task
              id={task.id}
              team={task.team}
              title={task.title}
              assignPerson={task.assignee}
              description={task.description}
              priority={task.priority}
              status={task.status}
              key={task.id}
            />
          ))}
      </div>
    </div>
  );
};

interface TaskProps {
  id: string;
  title: string;
  priority: string;
  description: string;
  assignPerson: string;
  status: Status;
  team: string;
}

export const Task = ({
  id,
  title,
  priority,
  description,
  assignPerson,
  team,
  status,
}: TaskProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setIsOpenEdit(true);
  };

  const handleDelete = () => {
    setIsOpenDelete(true);
  };
  return (
    <div className="p-2 bg-slate-400/35 rounded-md space-y-3" ref={dropdownRef}>
      <div className="flex">
        <h3 className="text-lg flex-1">{title}</h3>
        <div className="p-1 bg-blue-900/60 rounded-md flex justify-center items-center text-xs text-white">
          {priority}
        </div>
      </div>
      <div className="text-sm line-clamp-4">{description}</div>
      <div className="flex">
        <h3 className="text-base flex-1">@{assignPerson}</h3>
        <div className="relative inline-block">
          <div  
            className="p-1 bg-blue-900/60 text-white rounded-md flex justify-center items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <IoMdMore />
          </div>
          {isOpen && (
            <div className="absolute top-full right-0 mt-1 bg-white shadow-md rounded-md">
              <ul>
                <li
                  onClick={handleEdit}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  Edit
                </li>
                <li
                  onClick={handleDelete}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                >
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-1 px-3 bg-blue-900/60 text-white rounded-md flex justify-center items-center w-1/2">
        {status}
      </div>
      <DeleteTaskModal
        isOpen={isOpenDelete}
        setIsOpenDelete={setIsOpenDelete}
        title={title}
        id={id}
        status={status}
      />
      <EditTaskModal
      title={title}
      description={description}
      team={team}
      assignee={assignPerson}
      isOpen={isOpenEdit}
      setIsOpenEdit={setIsOpenEdit}
      status={status}
      priority={priority}
      id={id}
      />
    </div>
  );
};
