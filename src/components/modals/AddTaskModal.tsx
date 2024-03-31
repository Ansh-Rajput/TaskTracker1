import { useTaskStore } from "../../store/taskStore";
import Modal from "../Modal";

interface AddTaskModalProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
}

export const AddTaskModal = ({ isOpen, setIsOpen }: AddTaskModalProps) => {
  const addTask = useTaskStore((state) => state.addTask);
  const tasks = useTaskStore((state) => state.tasks);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { assignee, description, priority, team, title } =
      Object.fromEntries(formData);

    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof assignee !== "string" ||
      typeof priority !== "string" ||
      typeof team !== "string"
    ){
      console.log(typeof title ,
        typeof description ,
        typeof assignee ,
        typeof priority ,
        typeof team )
      return;
    }

    addTask(title, description,team,priority,assignee);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    setIsOpen(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <h2 className="text-xl">CREATE A TASK</h2>
          <div className="p-4 space-y-5 bg-slate-300 rounded-md">
            <label className="flex gap-2 space-y-2 items-center ">
              <span className="w-[100px] text-lg">Title:</span>
              <input type="text" className="flex-1" name="title" />
            </label>
            <label className="flex gap-2 space-y-2 items-center">
              <span className="w-[100px] text-lg">Description:</span>
              <textarea className="flex-1" name="description" />
            </label>
            <label className="flex gap-2 space-y-2 items-center">
              <span className="w-[100px] text-lg">Team:</span>
              <input type="text" className="flex-1" name="team" />
            </label>
            <label className="flex gap-2 space-y-2 items-center">
              <span className="w-[100px] text-lg">Assignees:</span>
              <input type="text" className="flex-1" name="assignee" />
            </label>
            <label className="flex gap-2 space-y-2 items-center">
              <span className="w-[100px] text-lg">priority:</span>
              <select id="selector" name="priority" className="flex-1">
                <option value="">Select...</option>
                <option value="p1">p1</option>
                <option value="p2">p2</option>
                <option value="p3">p3</option>
                <option value="p4">p4</option>
              </select>
            </label>
            <button className="py-2 px-5 bg-blue-900/80 rounded-sm text-white w-full">
              Add Task
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
