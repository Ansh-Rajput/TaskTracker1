import { taskStates } from "../../constants/tasks";
import { Status, useTaskStore } from "../../store/taskStore";
import Modal from "../Modal";

interface EditTaskModalProps {
  isOpen: boolean;
  setIsOpenEdit: (arg: boolean) => void;
  id: string;
  status: Status;
  priority: string;
  title: string;
  description: string;
  assignee: string;
  team: string;
}

export const EditTaskModal = ({
  isOpen,
  setIsOpenEdit,
  id,
  status,
  priority,
  title,
  description,
  assignee,
  team,
}: EditTaskModalProps) => {
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const { priority, status } = Object.fromEntries(formData);

    if (typeof priority !== "string") {
      console.log(typeof priority, typeof status);
      return;
    }

    updateTask(id, status as Status, priority);
    setIsOpenEdit(false);
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpenEdit(false)}>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <h2 className="text-xl">EDIT TASK</h2>
          <div className="p-4 space-y-5 bg-slate-300 rounded-md">
            <label className="flex gap-2 space-y-2 items-center ">
              <span className="w-[100px] text-lg">Title:</span>
              <input
                type="text"
                className="flex-1 text-gray-400"
                name="title"
                defaultValue={title}
                readOnly
              />
            </label>
            <label className="flex gap-2 space-y-2 items-center">
              <span className="w-[100px] text-lg">Description:</span>
              <textarea
                className="flex-1 text-gray-400"
                name="description"
                defaultValue={description}
                readOnly
              />
            </label>
            <label className="flex gap-2 space-y-2 items-center">
              <span className="w-[100px] text-lg">Team:</span>
              <input
                type="text"
                className="flex-1 text-gray-400"
                name="team"
                defaultValue={team}
                readOnly
              />
            </label>
            <label className="flex gap-2 space-y-2 items-center">
              <span className="w-[100px] text-lg">Assignees:</span>
              <input
                type="text"
                className="flex-1 text-gray-400"
                name="assignee"
                defaultValue={assignee}
                readOnly
              />
            </label>
            <div className="flex justify-between">
              <label className="flex gap-2 space-y-2 items-center">
                <span className="w-[100px] text-lg">priority:</span>
                <select
                  id="selector"
                  name="priority"
                  className="flex-1"
                  defaultValue={priority}
                >
                  <option value="p1">p1</option>
                  <option value="p2">p2</option>
                  <option value="p3">p3</option>
                  <option value="p4">p4</option>
                </select>
              </label>
              <label className="flex gap-2 space-y-2 items-center">
                <span className="w-[100px] text-lg">Staus:</span>
                <select
                  id="selector"
                  name="status"
                  className="flex-1"
                  defaultValue={status}
                >
                  {taskStates.map((task) => {
                    return <option value={task.state} key={task.state}>{task.state}</option>;
                  })}
                </select>
              </label>
            </div>
            <button className="py-2 px-5 bg-blue-900/80 rounded-sm text-white w-full">
              Submit
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
