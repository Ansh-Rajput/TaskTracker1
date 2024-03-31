import { useState } from "react";
import { AddTaskModal } from "./modals/AddTaskModal";

export const AddTaskButton = () => {
    const [isOpen,setIsOpen] = useState<boolean>(false);
  return (
    <>
      <button className="py-2 px-5 bg-blue-900/80 rounded-sm text-white"
        onClick={()=>setIsOpen(true)}
      >
        Add New Task
      </button>
      <AddTaskModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </>
  );
};
