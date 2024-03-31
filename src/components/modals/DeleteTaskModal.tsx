import { Status, useTaskStore } from "../../store/taskStore";
import Modal from "../Modal";

interface DeleteTaskModalProps {
  id: string;
  isOpen: boolean;
  setIsOpenDelete: (arg: boolean) => void;
  title: string;
  status: Status;
}

export const DeleteTaskModal = ({
  id,
  isOpen,
  setIsOpenDelete,
  title,
  status,
}: DeleteTaskModalProps) => {
  const removeTask = useTaskStore((state) => state.removeTask);
  const tasks = useTaskStore((state) => state.tasks);

  if (status === "Completed") {
    return (
      <>
        <Modal isOpen={isOpen} onClose={() => setIsOpenDelete(false)}>
          <div className="space-y-3">
            <h2 className="text-xl">DELETE TASK</h2>
            <div className="p-4 space-y-5 bg-slate-300 rounded-md">
              <div className="text-lg">
                Compleated Task can not be deleated!
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpenDelete(false)}>
        <div className="space-y-3">
          <h2 className="text-xl">DELETE TASK</h2>
          <div className="p-4 space-y-5 bg-slate-300 rounded-md">
            <div className="text-lg">Do you want to delete task ?</div>
            <div className="flex gap-1 items-center">
              <span className="flex-1 text-lg">{title}</span>
              <button
                className="p-2 bg-blue-900/80 rounded-sm text-white w-[20%]"
                onClick={() => {
                  removeTask(id);
                  localStorage.setItem("tasks",JSON.stringify(tasks));
                  setIsOpenDelete(false);
                }}
              >
                Yes
              </button>
              <button
                className="p-2 bg-blue-900/80 rounded-sm text-white w-[20%]"
                onClick={() => setIsOpenDelete(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
