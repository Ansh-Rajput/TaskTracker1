import { useEffect } from "react";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { TaskContainor } from "./components/TaskContainor";
import { useTaskStore } from "./store/taskStore";
import axios from "axios";
import { BASE_TASK_URL } from "./constants/tasks";

function App() {
  const setTasks = useTaskStore((state) => state.setTasks);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${BASE_TASK_URL}/getTasks`, {
          withCredentials: true,
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [setTasks]);
  return (
    <main className="container  m-auto">
      <div className="main">
        <div className="gradient"></div>
      </div>
      <div className="relative z-10 space-y-5 top-0 flex flex-col p-4 h-screen">
        <NavBar />
        <TaskContainor />
      </div>
    </main>
  );
}

export default App;
